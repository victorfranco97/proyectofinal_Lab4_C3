import { PrismaClient } from '@prisma/client';

/**
 * Utilidades para manejo de baja lógica (soft delete)
 */
export class SoftDeleteUtils {
  /**
   * Filtro estándar para excluir registros eliminados lógicamente
   */
  static getActiveFilter() {
    return {
      is_deleted: false
    };
  }

  /**
   * Filtro para incluir registros eliminados si se especifica
   */
  static getFilterWithDeleted(includeDeleted: boolean = false) {
    return includeDeleted ? {} : this.getActiveFilter();
  }

  /**
   * Datos para realizar baja lógica
   */
  static getSoftDeleteData() {
    return {
      is_deleted: true,
      deleted_at: new Date()
    };
  }

  /**
   * Datos para restaurar un registro eliminado lógicamente
   */
  static getRestoreData() {
    return {
      is_deleted: false,
      deleted_at: null
    };
  }

  /**
   * Convierte BigInt a string para JSON serialization
   */
  static serializeBigInt<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }

  /**
   * Aplica filtros de baja lógica a una consulta WHERE
   */
  static applyActiveFilter<T extends Record<string, any>>(where: T): T & { is_deleted: boolean } {
    return {
      ...where,
      is_deleted: false
    };
  }

  /**
   * Aplica filtros de baja lógica a include/select con relaciones
   */
  static applyActiveFilterToIncludes(include: any): any {
    if (!include || typeof include !== 'object') return include;

    const filtered = { ...include };

    Object.keys(filtered).forEach(key => {
      if (typeof filtered[key] === 'object' && filtered[key] !== null) {
        if (filtered[key].where) {
          filtered[key].where = this.applyActiveFilter(filtered[key].where);
        } else {
          filtered[key].where = this.getActiveFilter();
        }

        // Aplicar recursivamente a includes anidados
        if (filtered[key].include) {
          filtered[key].include = this.applyActiveFilterToIncludes(filtered[key].include);
        }
      } else if (filtered[key] === true) {
        // Si es solo true, convertir a objeto con filtro
        filtered[key] = {
          where: this.getActiveFilter()
        };
      }
    });

    return filtered;
  }
}

/**
 * Interface para opciones de consulta con baja lógica
 */
export interface SoftDeleteOptions {
  includeDeleted?: boolean;
  onlyDeleted?: boolean;
}

/**
 * Base class para servicios con soporte de baja lógica
 */
export abstract class SoftDeleteService<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  /**
   * Obtiene el modelo de Prisma para la entidad
   */
  protected getModel() {
    return (this.prisma as any)[this.modelName];
  }

  /**
   * Realiza baja lógica de un registro
   */
  async softDelete(id: bigint): Promise<T> {
    return this.getModel().update({
      where: { id },
      data: SoftDeleteUtils.getSoftDeleteData()
    });
  }

  /**
   * Restaura un registro eliminado lógicamente
   */
  async restore(id: bigint): Promise<T> {
    return this.getModel().update({
      where: { id },
      data: SoftDeleteUtils.getRestoreData()
    });
  }

  /**
   * Obtiene registros aplicando filtros de baja lógica
   */
  async findManyWithSoftDelete(options: {
    where?: any;
    include?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
    softDeleteOptions?: SoftDeleteOptions;
  } = {}): Promise<T[]> {
    const { where = {}, include, orderBy, skip, take, softDeleteOptions = {} } = options;

    let finalWhere = { ...where };

    if (softDeleteOptions.onlyDeleted) {
      finalWhere.is_deleted = true;
    } else if (!softDeleteOptions.includeDeleted) {
      finalWhere.is_deleted = false;
    }

    return this.getModel().findMany({
      where: finalWhere,
      include: include ? SoftDeleteUtils.applyActiveFilterToIncludes(include) : undefined,
      orderBy,
      skip,
      take
    });
  }

  /**
   * Obtiene un registro por ID aplicando filtros de baja lógica
   */
  async findUniqueWithSoftDelete(id: bigint, options: {
    include?: any;
    softDeleteOptions?: SoftDeleteOptions;
  } = {}): Promise<T | null> {
    const { include, softDeleteOptions = {} } = options;

    let where: any = { id };

    if (softDeleteOptions.onlyDeleted) {
      where.is_deleted = true;
    } else if (!softDeleteOptions.includeDeleted) {
      where.is_deleted = false;
    }

    return this.getModel().findFirst({
      where,
      include: include ? SoftDeleteUtils.applyActiveFilterToIncludes(include) : undefined
    });
  }
}

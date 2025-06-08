// src/utils/prismaUtils.ts
export const transformBigInt = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => transformBigInt(item));
  }
  if (data && typeof data === 'object') {
    const transformed: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(data)) {
      transformed[key] = typeof value === 'bigint' ? value.toString() : transformBigInt(value);
    }
    return transformed;
  }
  return data;
};
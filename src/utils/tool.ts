export interface ResetObjToPrimitiveType {
  [name: string]: string | number | object;
}

// 重置对象数据为基本数据类型
// 数字、数组、对象、其余重置为空字符串
export const resetObjToPrimitiveType = (data: ResetObjToPrimitiveType) => {
  if (!data) {
    return data;
  } else {
    Object.keys(data).map((item) => {
      if (typeof data[item] === 'number') {
        data[item] = 0;
        return;
      }

      if (Array.isArray(data[item])) {
        data[item] = [];
        return;
      }

      if (Object.prototype.toString.call(data[item]) === '[object Object]') {
        data[item] = {};
      } else {
        data[item] = '';
      }
    });
    return data;
  }
};

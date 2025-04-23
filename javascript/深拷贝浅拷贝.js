function deepClone(obj, hash = new WeakMap()) {
  // 处理 null 和 undefined
  if (obj === null || typeof obj === 'undefined') return obj;
  
  // 处理基本类型
  if (typeof obj !== 'object' && typeof obj !== 'function') return obj;
  
  // 处理日期对象
  if (obj instanceof Date) return new Date(obj);
  
  // 处理正则表达式
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  
  // 处理函数
  if (typeof obj === 'function') {
      return function() {
          return obj.apply(this, arguments);
      };
  }
  
  // 检查循环引用
  if (hash.has(obj)) return hash.get(obj);
  
  // 处理数组
  if (Array.isArray(obj)) {
      const newArray = [];
      hash.set(obj, newArray);
      obj.forEach((item, index) => {
          newArray[index] = deepClone(item, hash);
      });
      return newArray;
  }
  
  // 处理 Map
  if (obj instanceof Map) {
      const newMap = new Map();
      hash.set(obj, newMap);
      obj.forEach((value, key) => {
          newMap.set(deepClone(key, hash), deepClone(value, hash));
      });
      return newMap;
  }
  
  // 处理 Set
  if (obj instanceof Set) {
      const newSet = new Set();
      hash.set(obj, newSet);
      obj.forEach(value => {
          newSet.add(deepClone(value, hash));
      });
      return newSet;
  }
  
  // 处理普通对象
  const newObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, newObj);
  
  // 处理 Symbol 类型的键
  const symbolProperties = Object.getOwnPropertySymbols(obj);
  symbolProperties.forEach(symbol => {
      newObj[symbol] = deepClone(obj[symbol], hash);
  });
  
  // 处理普通键
  Object.keys(obj).forEach(key => {
      newObj[key] = deepClone(obj[key], hash);
  });
  
  return newObj;
}

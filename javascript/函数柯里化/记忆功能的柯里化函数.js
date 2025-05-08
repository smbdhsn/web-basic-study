function memoizedCurry(fn) {
    const cache = new Map();
    
    return function curried(...args) {
      if (args.length >= fn.length) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          console.log('Cache hit!');
          return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
      }
      
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    };
  }
  
  // 测试
  function expensiveOperation(a, b, c) {
    console.log('Calculating...');
    return a * b * c;
  }
  
  const memoizedMultiply = memoizedCurry(expensiveOperation);
  
  console.log(memoizedMultiply(2)(3)(4)); // 输出: Calculating... 24
  console.log(memoizedMultiply(2)(3)(4)); // 输出: Cache hit! 24
  console.log(memoizedMultiply(2, 3, 4)); // 输出: Cache hit! 24
  
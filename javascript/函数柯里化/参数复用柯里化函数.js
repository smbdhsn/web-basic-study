function reuseCurry(fn) {
    const storedArgs = [];
    
    function curried(...args) {
      if (args.length === 0) {
        // 执行函数
        return fn.apply(this, storedArgs);
      }
      
      // 存储参数
      storedArgs.push(...args);
      return curried;
    }
    
    // 重置存储的参数
    curried.reset = function() {
      storedArgs.length = 0;
      return curried;
    };
    
    return curried;
  }
  
  // 测试
  function concatenate(...args) {
    return args.join(' ');
  }
  
  const greet = reuseCurry(concatenate);
  greet('Hello')('world')('from')('JavaScript')();
  // 输出: "Hello world from JavaScript"
  
  // 重置并重用
  greet.reset()('Hi')('there')();
  // 输出: "Hi there"
  
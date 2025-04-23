/**
 * 题目 12: 原型链与异步
 */

function AsyncConstructor(id) {
    this.id = id;
    
    setTimeout(() => {
      this.asyncId = id + 100;
    }, 0);
  }
  
  AsyncConstructor.prototype.getId = function() {
    return this.id;
  };
  
  AsyncConstructor.prototype.getAsyncId = function() {
    return this.asyncId;
  };
  
  const obj1 = new AsyncConstructor(1);
  const obj2 = new AsyncConstructor(2);
  
  console.log(obj1.getId());
  console.log(obj2.getId());
  console.log(obj1.getAsyncId());
  console.log(obj2.getAsyncId());
  
  setTimeout(() => {
    console.log(obj1.getAsyncId());
    console.log(obj2.getAsyncId());
    
    AsyncConstructor.prototype.asyncId = 999;
    console.log(obj1.getAsyncId());
    console.log(obj2.getAsyncId());
  }, 10);
  
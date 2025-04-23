/**
 * 题目 11: 原型链与 class 语法
 */

class Base {
    constructor() {
      this.baseProp = "base";
    }
    
    baseMethod() {
      return this.baseProp;
    }
  }
  
  class Derived extends Base {
    constructor() {
      super();
      this.derivedProp = "derived";
    }
    
    derivedMethod() {
      return this.derivedProp + " " + this.baseMethod();
    }
  }
  
  const base = new Base();
  const derived = new Derived();
  
  console.log(Object.getPrototypeOf(derived) === Derived.prototype);
  console.log(Object.getPrototypeOf(Derived.prototype) === Base.prototype);
  console.log(derived instanceof Base);
  console.log(derived instanceof Derived);
  console.log(base instanceof Derived);
  
  Base.prototype.newMethod = function() { return "new"; };
  console.log(derived.newMethod());
  
  delete derived.baseProp;
  derived.baseProp = "overridden";
  console.log(base.baseProp);
  console.log(derived.baseProp);
  
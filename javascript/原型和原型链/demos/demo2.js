/**
 * 题目 2: 原型链与函数属性
 */

function Foo() {
    this.a = 1;
    return {
      a: 2
    };
  }
  
  Foo.prototype.a = 3;
  Foo.prototype.b = 4;
  
  const foo = new Foo(); // { a: 2 }
  console.log(foo.a); // 2
  console.log(foo.b); // undefined
  
  const bar = Foo(); // { a: 2 }
  console.log(bar.a); // 2
  console.log(bar.b); // undefined
  
  console.log(Object.getPrototypeOf(foo) === Foo.prototype); // false
  console.log(Object.getPrototypeOf(bar) === Object.prototype); // true
  
/**
 * 题目 6: 原型链与 Object.create
 */

const proto = {
    x: 10,
    calculate: function(z) {
      return this.x + this.y + z;
    }
  };
  
  const obj1 = Object.create(proto);
  obj1.y = 20;
  obj1.x = 30;
  
  const obj2 = Object.create(proto);
  obj2.y = 30;
  
  const calculate = obj1.calculate;
  
  console.log(obj1.calculate(30)); // 80
  console.log(obj2.calculate(40)); // 80
  console.log(calculate.call(obj1, 50)); // 100
  console.log(calculate.call(obj2, 50)); // 90
  
  delete obj1.x;
  console.log(obj1.calculate(30)); // 60
  
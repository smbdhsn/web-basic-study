/**
 * 题目 5: 原型链与属性遮蔽
 */

function SuperType() {
    this.property = true;
    this.colors = ["red", "blue"];
  }
  
  SuperType.prototype.getSuperValue = function() {
    return this.property;
  };
  
  function SubType() {
    this.subproperty = false;
  }
  
  SubType.prototype = new SuperType();
  SubType.prototype.getSubValue = function() {
    return this.subproperty;
  };
  
  const instance1 = new SubType();
  instance1.colors.push("green");
  
  const instance2 = new SubType();
  console.log(instance2.colors); // red blue green
  
  delete instance1.colors; // delete 操作符只能删除对象自身的属性，无法删除原型链上的属性。
  instance1.colors.push("black"); 
  
  console.log(instance2.colors); // [ 'red', 'blue', 'green', 'black' ]
  console.log(instance1.constructor === SuperType); // true
  console.log(instance1.constructor === SubType); // false
  
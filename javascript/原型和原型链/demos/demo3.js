/**
 * 题目 3: 原型链与方法调用
 */

const parent = {
    value: 2,
    getValue: function() {
      return this.value;
    }
  };
  
  const child = Object.create(parent);
  child.value = 5;
  
  const getValue = parent.getValue;
  
  console.log(parent.getValue()); // 2
  console.log(child.getValue()); // 5
  console.log(getValue()); // undefined
  console.log((child.getValue = child.getValue)()); // undefined
  console.log((parent.getValue.call(child))()); // 报错
  
/**
 * 这里相等分两种 一种是判断两个变量是否引用同一个对象 另一种是判断对象属性相等
 */

// 1. === 严格相等运算符 判断变量引用的地址

// 2. Object.is() 存在两种特殊情况
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is

console.log(Object.is(+0, -0)); // false

console.log(Object.is(NaN, NaN)); // true

console.log(0 === -0); // true

console.log(NaN === NaN); // false

// 判断属性是否相等

// Object.keys

// JSON.stringify

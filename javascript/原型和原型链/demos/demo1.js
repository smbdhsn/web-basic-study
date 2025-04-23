/**
 * 题目 1: 原型链修改与实例影响
 */

function Person() {}
Person.prototype.name = "Default";
Person.prototype.sayName = function() {
  return this.name;
};

const person1 = new Person();
person1.name = "Alice";
delete person1.name;

const person2 = new Person();
// 这一步是直接替换了原型对象
Person.prototype = { name: "Modified" };

const person3 = new Person();
Person.prototype.name = "Final";

console.log(person1.name); // Default
console.log(person2.name); // Default
console.log(person3.name); // Final
console.log(person1.constructor === Person); // true
console.log(person3.constructor === Person); // false

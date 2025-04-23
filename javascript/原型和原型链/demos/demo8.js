/**
 * 题目 8: 原型链与 proto
 */

const a = { x: 1 };
const b = { __proto__: a, y: 2 };
const c = { __proto__: b, z: 3 };

console.log(c.x + c.y + c.z); // 1 + 2 + 3 = 6

a.x = 10;
b.__proto__ = { x: 20 };

console.log(c.x + c.y + c.z); // 20 + 2 + 3 = 25

Object.setPrototypeOf(c, { y: 30, z: 40 });
console.log(c.x + c.y + c.z); // NaN

delete c.z;
console.log(c.x + c.y + c.z); // NaN

/**
 * 题目 7: 原型链与 Function 对象
 */

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

function User(name) {
  this.name = name;
}

User.method("getName", function () {
  return this.name;
}).method("setName", function (name) {
  this.name = name;
  return this;
});

const user = new User("John");
console.log(user.getName());
user.setName("Jane");
console.log(user.getName());

console.log(Function.prototype.getName);
console.log(User.getName);
console.log(User.__proto__.getName);
console.log(User.__proto__ === Function.prototype);

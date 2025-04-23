/**
 * 题目 4: 构造函数、原型与实例
 */

function User(name) {
    this.name = name;
  }
  
  User.prototype.getName = function() {
    return this.name;
  };
  
  const user1 = new User("John");
  User.prototype.constructor = function() {};
  
  const user2 = new User("Jane");
  User.prototype = { getName: function() { return `Modified: ${this.name}`; } };
  
  const user3 = new User("Jack");
  
  console.log(user1.getName()); // John
  console.log(user2.getName()); // Jane
  console.log(user3.getName()); // Modified Jack
  console.log(user1.constructor === User); // false
  console.log(user2.constructor === User); // false
  console.log(user3.constructor === User); // false
  
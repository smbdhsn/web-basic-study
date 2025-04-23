/**
 * 对象是通过键值对存储数据 数组通过索引存储数据 同时具有length属性
 * 两者原型不同 所以继承的属性不同 比如数组原型上实现了Symbol.iterator迭代器属性 能够实现for of循环
 * 同时数组还有一系列的api对数据进行操作 push pop shift unshift splice等等
 * 同时循环的方式也是不一样的 对象一般采用for in for(key in keys)
 * 数组则提供了一系列方法 forEach map
 */

const obj = {
  a: 1,
  b: 2,
  11: 11,
  22: 22,
  c: 3,
  cc: 33,
  bb: 22,
  aa: 11,
  0: 0,
  0: "00",
  1: 1,
  2: 2,
  "-1": -1,
};

// 两次赋值是同一个键
// 对象的key仅限于字符串 Symbol 其余类型会转为字符串
obj[100] = 100;
obj["100"] = 102;

console.log(obj[100]); // 102

const proto = Object.getPrototypeOf(obj);
proto.color = "red";

Object.defineProperty(obj, "count", {
  enumerable: false,
  value: 11,
  writable: true,
  configurable: true,
});

// obj is not iterable
// for (let item of obj) {
//   console.log(item);
// }

// 会遍历原型链上的属性 但不会遍历私有属性enumerable:false
for (let key in obj) {
  console.log(key, typeof key, obj[key]);
}

console.log("--------------------------1");

for (let key of Object.keys(obj)) {
  // 首先打印数字键 再打印字符键 类型都是string类型
  // enumerable:false的属性无法打印
  console.log(key, typeof key, obj[key]);
}

console.log("--------------------------2");

// 可以打印被隐藏的key 不会打印原型链上的属性
for (let key of Reflect.ownKeys(obj)) {
  console.log(key, typeof key, obj[key]);
}

console.log("--------------------------3");

// 与Object.keys() 表现一致 原型链上的属性也不会打印，私有属性也不会打印
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

console.log("--------------------------4");

const arr = [1, 2, 3, 4, 5];

arr["x"] = "xxx";
arr[7] = 6;

// 遍历最后一个数字索引存在的位置 如果中间位置不存在元素 则为undefined
for (let item of arr) {
  console.log(item);
}

console.log(Object.keys(arr)); // 可以打印出非数字索引

// 打印存在的索引 这种遍历不会打印中间空着的元素
for (let key of Object.keys(arr)) {
  console.log(key, arr[key]);
}

console.log("--------------------------5");

// 打印公开属性和原型链上的属性
for (let key in arr) {
  console.log(key);
}

console.log("--------------------------6");

// 对象通过实现迭代器属性去实现for of遍历
const iteratorObj = {
  name: "tom",
  age: 22,
  sex: "male",
  hobby: ["sing"],
};

iteratorObj[Symbol.iterator] = function () {
  const keys = Object.keys(iteratorObj);
  const end = keys.length;
  let index = 0;
  return {
    next() {
      if (index < end) {
        const key = keys[index];
        index++;
        return { done: false, value: iteratorObj[key] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
};

for (let item of iteratorObj) {
  console.log(item);
}

console.log("--------------------------7");

const testArr = [1,2,3,4,5];
testArr['str'] = 'str';
console.log(Object.keys(testArr))
console.log(testArr.pop())
console.log(Object.keys(testArr))
for(let item of testArr) {
  console.log('item', item)
}
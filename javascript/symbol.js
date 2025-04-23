/** 
symbol 简单用法 
Symbol(key: string | number)
Symbol.for(key: string) -> symbol
Symbol.keyFor(symbol: symbol) -> string
特殊属性
Symbol.toPrimitive  影响==隐式类型转换
Symbol.toStringTag  影响Object.prototype.toString.call的输出
Symbol.iterator 迭代器 生成迭代器对象支持 for of循环
*/

Symbol("foo") === Symbol("foo"); // false

// var sym = new Symbol(); // TypeError

const sym1 = Symbol.for("key1");
console.log(Symbol.keyFor(sym1));

/*
 * Symbol.toPrimitive
 */
const obj = {};
console.log(+obj); // NaN
console.log(`${obj}`); // [object Object]
console.log(obj + ""); // [object Object]

const obj2 = {
  [Symbol.toPrimitive](hint) {
    // 该函数被调用时，会被传递一个字符串参数 hint，表示要转换到的原始值的预期类型
    // hint 包含 string number default
    if (hint === "number") {
      return "100";
    }
    if (hint === "string") {
      return "string";
    }

    if (hint === "default") {
      return "default";
    }
  },
};

console.log(+obj2); // 100
console.log(`${obj2}`); // string
console.log(obj2 + ""); // default

// Symbol.toStringTag
// 它由 Object.prototype.toString() 方法内部访问
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "validator";
  }
}

console.log(Object.prototype.toString.call(new ValidatorClass()));

function Person(name) {
  this.name = name;
}

Object.defineProperty(Person.prototype, Symbol.toStringTag, {
  get() {
    return "Person";
  },
});

console.log(Object.prototype.toString.call(new Person()));

/*
   Symbol.iterator 生成迭代器对象
*/
function range(from, to) {
  let index = from;

  const iterator = {
    [Symbol.iterator]() {
      return {
        next: function () {
          if (index <= to) {
            return { done: false, value: index++ };
          }
          return { done: true, value: undefined };
        },
      };
    },
  };

  return iterator;
}

const iterator = range(1, 4);

for (let i of iterator) {
  console.log(i);
}

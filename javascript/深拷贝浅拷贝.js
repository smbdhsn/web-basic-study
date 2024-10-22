const obj1 = {
  id: "obj1",
  fn: () => console.log("fn"),
  sym: Symbol.for("symbol"),
  array: [1, 2, { id: "array" }, () => {}, undefined, null, Symbol.for("123")],
};

const arr1 = [1, 2, 3, 4];

const toString = (context) => Object.prototype.toString.call(context);
// 对象字面量的拷贝
{
  const keys = Object.keys(obj1);
  const copyObj = {};
  for (let key of keys) {
    const val = obj1[key];
    if (toString(val) === "[object Object]") {
    } else if (toString(val) === "[object Array]") {
    } else if (toString(val) === "[object Function]") {
    }
  }
  console.log(copyObj);
}

{
  // JSON.parse(JSON.stringfy(obj)) 无法拷贝函数、undefined symbol
  const copyObj = JSON.parse(JSON.stringify(obj1));
  console.log(copyObj);
}

// 数组拷贝
{
  const copyArr = arr1.slice(0, 2);
  console.log(copyArr);
}

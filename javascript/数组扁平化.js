const nestedArray = [1, [2, 3], [4, [5, 6]]];
/* Array.prototype.flat es2019+
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
* flat属于浅拷贝 如果数组被展开，那么内部的空槽会被忽略
*/
const flattened1 = nestedArray.flat(2);
console.log('flattened1', flattened1);

/**
 * 使用递归实现扁平化
 */
function flatten(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}
const flattened2 = flatten(nestedArray);
console.log('flattened2', flattened2);

function flattenWithReduce(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flattenWithReduce(val) : val)
  }, [])
}

const flattened3 = flattenWithReduce(nestedArray);
console.log('flattened3', flattened3);

// 使用迭代方法
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];

  while(stack.length) {
    const ele = stack.pop();
    if(Array.isArray(ele)) {
      stack.push(...ele);
    } else {
      result.unshift(ele);
    }
  }

  return result;
}

const flattened4 = flattenIterative(nestedArray);
console.log('flattened4', flattened4);

// 针对只有数字类型的嵌套
const flattenJustNumber = (arr) => {
  return arr.toString().split(',').map(Number);
}

const flattened5 = flattenIterative(nestedArray);
console.log('flattened5', flattened5);
/**
 * 实现一个通用的柯里化函数
 */

function curry(fn) {
    return function curried(...args) {
        // 如果参数数量足够 执行 
        if(args.length >= fn.length) {
            return fn.apply(this, args);
        }
        // 参数数量不够 缓存下来 重新返回一个curried函数
        // 这里使用apply而不是bind
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        }
    }
}

const add = (a, b, c) => a + b + c;

const curried = curry(add);

console.log(curried(1)(2)(3));
console.log(curried(1, 2)(3));
console.log(curried(1, 2, 3));

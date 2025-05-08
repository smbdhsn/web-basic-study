/**
 * 支持占位符
 */

function curry(fn) {
    // 占位符
    const placeholder = curry.placeholder;
    const argsLen = fn.length;

    return function curried(...args) {
        const isCompleted = args.length >= argsLen && args.slice(0, argsLen).every((arg) => arg !== placeholder);

        if(isCompleted) {
            return fn.apply(this, args);
        } else {
            return function(...moreArgs) {
                // 替换args中的占位符
                // 针对情况：curriedAdd(_, 2)(1, 3) 需要加上concat(moreArgs);
                const newArgs = args.map(arg => {
                    return arg === placeholder && moreArgs.length > 0 ? moreArgs.shift() : arg
                }).concat(moreArgs);
                return curried.apply(this, newArgs);
            }
        }
    }
}

curry.placeholder = Symbol('_');

const _ = curry.placeholder;

const add = (a, b, c) => a + b + c;

const curriedAdd = curry(add);
console.log(curriedAdd(1, 2, 3)); // 6
console.log(curriedAdd(_, 2)(1, 3)); // 6
console.log(curriedAdd(_, _, 3)(1)(2)); // 6
console.log(curriedAdd(_, _, _)(1, 2, 3)); // 6
/**
 * 以下几种循环是否可以被break 或者return打断
 * 四种循环 for in , for of, for(), while都可以被break打断 同时都可以通过await延缓后面代码执行 return也可以打断 但是相当于退出执行
 * forEach方法 使用break会报错 return也不会打断循环
 */

function printLine(str) {
    console.log(`--------${str}---------`);
}

const obj = {
    name: "tom",
    age: 22,
    sex: 'male',
    hobby: ['sing', 'rapper']
};

const arr = ['jack', 'tommy', 'rose', 'jerry'];

// for in
// 可以通过break, return打断循环 但是后续代码不会执行
for(let key in obj) {
    if(key === 'sex') break;
    // if(key === 'sex') return;
    console.log(key, obj[key]);
}

printLine('for in');

// for of 
// 可以通过break、return打断循环  但是后续代码不会执行
// 如果对象想通过for of遍历 需要实现Symbol.iterator接口
for(let item of arr) {
    if(item === 'rose') break;
    // if(item === 'rose') return;
    console.log(item);
}

printLine('for obj iterator');

obj[Symbol.iterator] = function () {
    let index = 0, keys = Object.keys(obj);
    return {
        next() {
            if(index < keys.length) {
                return {
                    value: obj[keys[index++]],
                    done: false
                }
            } else {
                return {
                    done: true,
                    value: undefined
                }
            }
        }
    }
}
for(let item of obj) {
    console.log(item)
}

printLine('for of');
// for(let i = 0; i < 10; i++) {}
// 可以通过break、return打断循环  但是后续代码不会执行
for(let i = 0; i < arr.length; i++) {
    if(i === 2) break;
    // if(i === 2) return;
    console.log(i, arr[i])
}
printLine('normal for');
// forEach
// return只会打断某个元素的遍历 整体循环不会被打断
// 使用break会报错
arr.forEach((item, index) => {
    if(index == 2) {
        return 123
    }
    console.log(item)
})
printLine('normal for await');
// for循环支持await吗
function mockRequest(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time);
        }, time * 1000);
    })
}

// for of | for in | for(let i = 0; i < len; i++) 三者都支持await 不过会延迟执行 需要注意
// (async function () {
//     const mockRequests = [1,2,3].map(t => mockRequest(t));
//     // for(let req of mockRequests) {
//     //     const result = await req;
//     //     console.log('result', result)
//     // }
//     // for(let i=0; i < mockRequests.length; i++) {
//     //     const result = await mockRequests[i];
//     //     console.log('result', result)
//     // }
//     for(let index in mockRequests) {
//         const result = await mockRequests[index];
//         console.log('result', result)
//     }
// })()

printLine('while');

// while循环 break可以打断
let index = 0;
while(index < arr.length) {
    if(index === 2) break;
    console.log(index, arr[index])
    index++;
}

printLine('while await');

(async function() {
    const mockRequests = [1,10, 20].map(t => mockRequest(t));
    index = 0;
    while(index < mockRequests.length) {
        if(index === 2) break;
        const res = await mockRequests[index];
        console.log('result', res)
        index++;
    }
})()

console.log('end')
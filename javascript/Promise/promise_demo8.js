// const p = Promise.resolve(1).finally(() => {
//     console.log('execute finally');
// })

// p.then(val => {
//     console.log('val', val); // val 1
// })

// // 所以finally只是执行了一次穿入的函数 并不会影响promise的状态

// const p1 = new Promise((resolve, reject) => {
//     resolve(1);
// })
// const p2 = new Promise(resolve => {
//     setTimeout(() => resolve(2), 1000);
// })
// const p3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(1)
//     }, 2000)
// });
// const p4 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(4)
//     }, 3000)
// });
// const p5 = new Promise((resolve, reject) => {
//     setTimeout(() => reject(5), 4000);
// })

// Promise.all([p1, p2, p4]).then(vals => {
//     console.log(vals);
// }, (reason => {
//     console.log('reason', reason);
// }))

// Promise.any([p3, p5]).then(val => {
//     console.log('any val', val);
// }, (reason => {
//     console.log('reason', reason.errors);
// }))

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(1)
    }, 300)
}).catch((reason) => {
    console.log('reason', reason);
});

setTimeout(() => {
    console.dir(p);
}, 500)

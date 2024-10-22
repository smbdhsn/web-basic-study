const thenable = {
  then(resolvePromise) {
    console.log('thenable 100')
    resolvePromise(100);
  },
};

const p = Promise.resolve("p");
// 当resolve一个thenable或者promise对象时 存在一个微任务
new Promise((resolve) => {
  resolve(thenable);
}).then(() => console.log("1"));

console.log('temp')

Promise.resolve(2).then(() => {
  console.log(2);
});

// result: 2 1

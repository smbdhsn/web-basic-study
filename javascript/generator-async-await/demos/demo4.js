// async function testB() {
//   return {
//     then(cb) {
//       cb();
//       console.log("cb");
//     },
//   };
// }

// testB().then(() => console.log(1));

// console.log(5);

// Promise.resolve()
//   .then(() => console.log(2))
//   .then(() => console.log(3));

// (等待一个then)最终结果👉: 5 cb 2 1 3



const thenable = {
  then(resolvePromise) {
    // 异步改变状态 
    console.log('thenable1')
    resolvePromise(1);
    console.log('thenable2')
  },
};

Promise.resolve(thenable).then(() => {
  console.log(1);
});

console.log('同步测试')

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));

  // 同步测试
  // thenable1
  // thenable2
  // 2
  // 1
  // 3

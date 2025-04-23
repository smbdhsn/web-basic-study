// demo1
// async function test() {
//   console.log(1);
//   await 1;
//   console.log(2);
// }

// test();

// console.log(3);
// 最终结果👉: 1 3 2

// demo2
// function func() {
//   console.log(2);
// }

// async function test() {
//   console.log(1);
//   await func();
//   console.log(3);
// }

// test();
// console.log(4);

// 最终结果👉: 1 2 4 3

// demo3
// async function test() {
//   console.log(1);
//   await 123;
//   console.log(2);
// }

// test();

// console.log(3);

// Promise.resolve()
//   .then(() => console.log(4))
//   .then(() => console.log(5))
//   .then(() => console.log(6))
//   .then(() => console.log(7));

// 最终结果👉: 1 3 2 4 5 6 7

// demo4
// async function test() {
//   console.log(1);
//   await {
//     then(cb) {
//       cb();
//     },
//   };
//   console.log(2);
// }

// test();

// console.log(3);

// Promise.resolve()
//   .then(() => console.log(4))
//   .then(() => console.log(5))
//   .then(() => console.log(6))
//   .then(() => console.log(7));

// 最终结果👉: 1 3 4 2 5 6 7

// async function tt() {
//   return Promise.resolve(123)
// }
// demo5
async function test() {
  console.log(1);
  await new Promise((resolve, reject) => {
    resolve();
  });
  console.log(2);
}

test();

console.log(3);

Promise.resolve()
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))
  .then(() => console.log(7));

// 最终结果👉: 1 3 2 4 5 6 7

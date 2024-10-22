async function func() {
  console.log(1);
  await 1;
  console.log(2);
  await 2;
  console.log(3);
  await 3;
  console.log(4);
}

async function test() {
  console.log(5);
  await func();
  console.log(6);
}

test();
console.log(7);

Promise.resolve()
  .then(() => console.log(8))
  .then(() => console.log(9))
  .then(() => console.log(10))
  .then(() => console.log(11));

/**
 * result: 5 1 7 2 8 3 9 4 10 6 11
 * microtask queue:
 * task queue:
 */
// 最终结果👉: 5 1 7 2 8 3 9 4 10 6 11

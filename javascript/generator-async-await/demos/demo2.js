async function async1() {
  await async2();
  console.log("A");
}

function mockAsync1() {
  Promise.resolve(async2()).then(() => {
    console.log("A");
  });
}

async function async2() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

async1();

new Promise((resolve) => {
  console.log("B");
  resolve();
})
  .then(() => {
    console.log("C");
  })
  .then(() => {
    console.log("D");
  });

// 最终结果👉: B C D A

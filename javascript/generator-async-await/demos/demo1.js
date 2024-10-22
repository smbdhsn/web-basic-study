async function async1() {
  // 这里不太一样 只有一个异步
  await new Promise((resolve, reject) => {
    resolve();
  });
  console.log("A");
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

// 最终结果👉: B A C D
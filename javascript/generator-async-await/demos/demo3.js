async function testA() {
  return 1;
}

testA().then(() => console.log(1));

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));

// (不等待)最终结果👉: 1 2 3

'use strict';

// clearTimeout 即使id不正确也不会报错
try {
    clearTimeout(999)
    clearTimeout(null)
    clearTimeout(undefined)
    clearTimeout({ name: 'age'})
    clearInterval(999)
    clearInterval(null)
    clearInterval(undefined)
} catch(e) {
    console.log('e', e)
}
// 传入函数
setTimeout((name) => {
    console.log('setTimeout', name);
}, 3000, 'jack')


// 在浏览器中，嵌套的 setTimeout 调用可能会被限制为至少 4 毫秒的延迟，以防止过于频繁的调用
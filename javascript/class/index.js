// class 类是ES6引入的语法糖，用于更清晰和简洁地定义构造函数和原型方法。类本质上是函数的语法糖
// class声明不会提升，必须在使用之前定义
// 原型链是线性的 所以只支持单继承

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log('Animal speak');
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        console.log('Dog speak');
    }
}
{
    // 原型链继承
    function Parent() {
        this.name = 'parent';
    }
    
    Parent.prototype.getName = function() {
        return this.name;
    };
    
    function Child() {
        this.childName = 'child';
    }
    
    // 设置Child的原型为Parent的实例
    Child.prototype = new Parent();
    Child.prototype.constructor = Child; // 修复constructor指向
    
    const child = new Child();
    console.log(child.getName()); // parent

    // 流程是  getName -> child实例 -> child.prototype -> parent.prototype -> this(Child实例) -> child.name不存在 -> child.prototype.name -> print parent
    // 优点：简单易懂，父类方法可以复用。
    // 缺点：所有实例共享父类实例的属性；创建子类实例时无法向父类构造函数传参。

}

{
    // 构造函数继承
    function Parent(name) {
        this.name = name;
    }
    
    function Child(name) {
        Parent.call(this, name); // 调用父类构造函数
        this.childName = 'child';
    }
    
    const child = new Child('parent');
    console.log(child.name); // 'parent'

    // 优点：可以向父类构造函数传参；不共享父类实例属性。
    // 缺点：无法继承父类原型上的方法；每个子类实例都会创建父类方法的副本，无法复用。
    
}

{
    // 组合继承
    function Parent(name) {
        this.name = name;
    }
    
    Parent.prototype.getName = function() {
        return this.name;
    };
    
    function Child(name, age) {
        Parent.call(this, name); // 继承属性
        this.age = age;
    }
    
    // 继承方法
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
    
    const child = new Child('parent', 18);
    console.log(child.getName()); // 'parent'
    
    // 优点：结合了原型链和构造函数继承的优点。
    // 缺点：父类构造函数被调用两次，效率较低。
}

{
    // 寄生组合式继承
    function Parent(name, age) {
        this.name = name;
        this.age = age;
    }

    function Son(name, age, sex) {
        Parent.call(this, name, age);
        this.sex = sex;
    }

    Son.prototype = Object.create(Parent.prototype);
    Son.prototype.constructor = Son;
}
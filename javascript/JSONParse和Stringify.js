/**
 * JSON.parse(text[, reviver])
 * reviver 函数可以在解析过程中转换值，它接收两个参数：键和值（转化后的值）。
 * 不支持undefined， 函数， Symbol， 循环引用
 */

const jsonString = '{"name":"John","birthDate":"2000-01-01","isAdmin":false}';

const obj = JSON.parse(jsonString, (key, value) => {
  // key value都是parse之后的值

  // 将日期字符串转换为 Date 对象
  if (key === 'birthDate') {
    return new Date(value);
  }
  // 将 isAdmin 布尔值转换为权限级别
  if (key === 'isAdmin') {
    return value ? 'admin' : 'user';
  }
  return value;
});

console.log(obj.birthDate instanceof Date); // true
console.log(obj.birthDate.getFullYear());   // 2000
console.log(obj.isAdmin);                   // "user"

const jsonString2 = '{"name": undefined }';

try {
    const str = JSON.parse(jsonString2);
    console.log('str', str);
} catch(err) {
    console.log('err', err.stack);
}

/**
 * JSON.stringify(value[, replacer[, space]])
 * @param {*} value 要转换的 JavaScript 值
 * @param {Function | Array | null} replacer 数组或函数，用于转换值，或者过滤对象属性的数组
 * @param {*} space 字符串或数字，用于缩进格式化的字符串
 */

const data = {
    name: "John",
    password: "secret123",
    age: 30,
    birthDate: new Date(1990, 0, 1)
};
  
// 使用 replacer 函数过滤敏感信息并格式化日期
const jsonString3 = JSON.stringify(data, (key, value) => {
    // key value都是原始值

    // 隐藏密码
    if (key === 'password') {
        return undefined; // 返回 undefined 将跳过该属性
    }
    // 格式化日期
    if (value instanceof Date) {
        return value.toISOString();
    }
    return value;
});

console.log(jsonString3);
// {"name":"John","age":30,"birthDate":"1990-01-01T00:00:00.000Z"}

// replacer作为数组 只包含指定的属性
const user = {
    id: 123,
    name: "Alice",
    email: "alice@example.com",
    password: "secret",
    address: "123 Main St",
    phone: "555-1234",
    dto: {
        id: 456,
        name: 'dto'
    }
  };
  
  // 只包含指定的属性
  const jsonString4 = JSON.stringify(user, ['id', 'name', 'email', 'dto']);
  console.log(jsonString4);
  // {"id":123,"name":"Alice","email":"alice@example.com"}
  
  {
    // 使用space参数美化输出
    const data = {
        users: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" }
        ],
        active: true,
        lastUpdated: "2023-01-01"
    };
    
    // 使用 2 个空格缩进
    console.log(JSON.stringify(data, null, 2));
    /*
    {
        "users": [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "Jane"
        }
        ],
        "active": true,
        "lastUpdated": "2023-01-01"
    }
    */
    
    // 使用制表符缩进
    console.log(JSON.stringify(data, null, '\t'));
    
    // 使用自定义字符串缩进
    console.log(JSON.stringify(data, null, '..'));
  }
  
  {
     // 处理特殊类型和值
    const specialData = {
        normalValue: 42,
        functionValue: function() { return 'hello'; },
        undefinedValue: undefined,
        symbolValue: Symbol('symbol'),
        nanValue: NaN,
        infinityValue: Infinity,
        dateValue: new Date(),
        regexValue: /pattern/g
    };
    
    console.log(JSON.stringify(specialData));
    // {"normalValue":42,"nanValue":null,"infinityValue":null,"dateValue":"2023-07-20T12:00:00.000Z","regexValue":{}}
    
    // 注意：函数、undefined 和 Symbol 被完全忽略
    // NaN 和 Infinity 被转换为 null
    // Date 被转换为 ISO 字符串
    // RegExp 被转换为空对象
  }
 
  
  {
    // toJSON方法
    class Person {
        constructor(name, age) {
          this.name = name;
          this.age = age;
          this._secretData = "confidential";
        }
        
        // 自定义 JSON 序列化行为
        toJSON() {
          return {
            name: this.name,
            age: this.age,
            adult: this.age >= 18
          };
        }
    }
      
    const alice = new Person("Alice", 25);
    const jsonAlice = JSON.stringify(alice);
    console.log(JSON.stringify(alice));
    console.log(typeof jsonAlice);
    // {"name":"Alice","age":25,"adult":true}
      
  }

  {
    // 创建循环引用
    const circular = { name: "Circular Object" };
    circular.self = circular;

    try {
    JSON.stringify(circular);
    } catch (error) {
    console.error("循环引用错误:", error.message);
    // TypeError: Converting circular structure to JSON
    }

    // 解决方案：使用 replacer 函数检测循环引用
    function safeStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        // 最先执行的是 key=undefined value=circular本身
        if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
            return '[Circular Reference]';
        }
        seen.add(value);
        }
        return value;
    });
    }

    console.log(safeStringify(circular));
    // {"name":"Circular Object","self":"[Circular Reference]"}

  }
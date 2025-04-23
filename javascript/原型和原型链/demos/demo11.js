/**
 * 题目 10: 原型链与 this 绑定
 */

const calculator = {
    value: 0,
    add: function(x) {
      this.value += x;
      return this;
    },
    multiply: function(x) {
      this.value *= x;
      return this;
    },
    getValue: function() {
      return this.value;
    }
  };
  
  const scientific = Object.create(calculator);
  scientific.square = function() {
    this.value *= this.value;
    return this;
  };
  
  const sequence = [
    scientific.add(5),
    scientific.multiply(2),
    scientific.square(),
    calculator.add(10),
    calculator.multiply(2)
  ];
  
  console.log(sequence[0].getValue());
  console.log(sequence[1].getValue());
  console.log(sequence[2].getValue());
  console.log(sequence[3].getValue());
  console.log(sequence[4].getValue());
  console.log(scientific.getValue());
  console.log(calculator.getValue());
  
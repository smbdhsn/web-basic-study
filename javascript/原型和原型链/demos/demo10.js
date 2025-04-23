/**
 * 题目 9: 原型链与继承
 */

function Animal() {}
Animal.prototype.species = "Animal";

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() { return "Woof!"; };

function Labrador() {}
Labrador.prototype = Object.create(Dog.prototype);
Labrador.prototype.constructor = Labrador;

const animal = new Animal();
const dog = new Dog();
const lab = new Labrador();

Animal.prototype.species = "Modified Animal";
Dog.prototype.species = "Canine";

console.log(animal.species);
console.log(dog.species);
console.log(lab.species);

console.log(lab instanceof Animal);
console.log(lab instanceof Dog);
console.log(lab.constructor === Labrador);
console.log(lab.constructor === Dog);

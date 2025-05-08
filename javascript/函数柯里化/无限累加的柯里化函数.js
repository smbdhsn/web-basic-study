function sum(a) {
    let count = 0;

    if(a === undefined) return count;

    function add(b) {
        if(b === undefined) return count;
        count += b;
        return add;
    }

    add.toString = function() {
        return count + '';
    }

    return add
}

console.log(sum(1)(2)(3));
console.log(sum(1)(5)(7)());

var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function () {

}

[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
["1", "2", "3"].includes(3); // false



const arr = ["a", "b", "c"];

arr.includes("c", 3); // false
arr.includes("c", 100); // false


// array length is 3
// fromIndex is -100
// computed index is 3 + (-100) = -97

const abc = ["a", "b", "c"];

abc.includes("a", -100); // true
abc.includes("b", -100); // true
abc.includes("c", -100); // true
abc.includes("a", -2); // false


console.log([1, , 3].includes(undefined)); // true

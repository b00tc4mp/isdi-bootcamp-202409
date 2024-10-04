console.log('TEST Array.prototype.includes')

console.log('CASE determines whether an array includes a certain value')

// The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate.

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false

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


const arrayLike = {
    length: 3,
    0: 2,
    1: 3,
    2: 4,
    3: 1, // ignored by includes() since length is 3
};
console.log(Array.prototype.includes.call(arrayLike, 2));
// true
console.log(Array.prototype.includes.call(arrayLike, 1));
// false
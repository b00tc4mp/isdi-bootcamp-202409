// shift & unshift command //
//unshift() adds one or more elements to the beginning of an array and returns the new length of the array.
//shift() removes the first element from an array and returns that removed element.

let numbers = [2, 3, 4];

// Use unshift() to add elements to the beginning of the array
numbers.unshift(0, 1);
console.log(numbers);  // Output: [0, 1, 2, 3, 4]

// Use shift() to remove the first element of the array
let firstElement = numbers.shift();
console.log(firstElement);  // Output: 0
console.log(numbers);       // Output: [1, 2, 3, 4]

Explanation:

//unshift(0, 1) adds 0 and 1 to the beginning of the array, making the array [0, 1, 2, 3, 4].
//shift() removes the first element (0), and the array becomes [1, 2, 3, 4].+¨


const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1

var shift = function (iterable){
    var first = iterable[0]
    delete iterable[0]
} 
return 
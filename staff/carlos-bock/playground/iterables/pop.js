//  iterables (push, pop, at, indexOf, lastIndexOf, concat, join, reverse, shift, unshift,
// returns popped value

function pop (array) {
    let popped = array[array.length-1];
    array.length--;

    return popped;
}


var arr1 = [1, 2, 3, 4, 5, 6, 7];
var arr2 = [false, false, true, false];

console.log(pop(arr1));
console.log(pop(arr2));
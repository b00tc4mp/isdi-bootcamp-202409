//  iterables (push, pop, at, indexOf, lastIndexOf, concat, join, reverse, shift, unshift,
// returns popped value

function pop (array) {
    let popped = array[array.length-1];
    array.length--;

    return popped;
}


var obj1 = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, length:7};
var obj2 = {0:false, 1: false, 2:true, 3:false, length:4};

console.log(pop(obj1));
console.log(pop(obj2));
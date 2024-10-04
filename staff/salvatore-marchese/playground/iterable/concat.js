//Here’s a simple example of using the concat() method in JavaScript. The concat() method is used to merge two or more arrays. It does not modify the existing arrays but instead returns a new array.

let array1 = [1, 2, 3];
let array2 = [4, 5, 6];

// Use concat() to merge array1 and array2
let combinedArray = array1.concat(array2);

console.log(combinedArray);  // Output: [1, 2, 3, 4, 5, 6]

//The concat() method joins array1 ([1, 2, 3]) and array2 ([4, 5, 6]) to form a new array [1, 2, 3, 4, 5, 6].
//Neither array1 nor array2 are modified in the process. It returns a new array.

var concat = function (iterable, iterable){
    /*
    iterable -> {0:'a' , 1:'b', 2:'c' length 3}
    iterable2 -> {0: 'd', 1:'e', 2:'f' length 3}
    result -> {length 0}

    result -> {0:'a', 1: lenth}
    result -> {0:'a', 1:'b', 2: lenth}
    result-> {0:'a', 1:'b', 2:'c',3: lenth}

    result-> {0:'a', 1:'b', 2:'c', 3:'d',4: lenth}
    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e',5: lenth}
    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 6: lenth}

    returb result
    */
}

var result = { length: 0 }

for (var i = 0; i < iterable.length; i++) {
    var elemnt = iterable[i]

    result[i] = element
    result.length++
}

for (var i = 0; i < iterable2.length; i++) {
    var elemnt = iterable2[i]

    result[i] = element
    result.length++
}





console.log('TEST array.prototype.concat')

console.log('CASE concat charcters')

var abc = ['a', 'b', 'c']
var def = ['d', 'e', 'f']
var abcdef = concat(abc, def) // look at function above 'for' examples.
console.log(abcdef)
// [0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 6 lenth]

console.log('CASE concat 3 arrays of charcters')

var concat = function (iterable, iterable2) {
    if (arguments.length === 2); 
         /*
    iterable -> {0:'a' , 1:'b', 2:'c' length 3}
    iterable2 -> {0: 'd', 1:'e', 2:'f' length 3}
    iterable3(arguments) -> {0: 'g', 1:'h', 2:'i', 3: length}

    result -> {length 0}

    result -> {0:'a', 1: lenth}
    result -> {0:'a', 1:'b', 2: lenth}
    result-> {0:'a', 1:'b', 2:'c',3: lenth}

    result-> {0:'a', 1:'b', 2:'c', 3:'d',4: lenth}
    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e',5: lenth}
    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 6: lenth}

    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 'g', 7: lenth}
    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 'g', 'h', 8: lenth}
    result-> {0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 'g', 'h', 'i', 9: lenth}

    

    returb result
    */
}

var result = { length: 0 }

for (var i = 0; i < iterable.length; i++) {
    var elemnt = iterable[i]

    result[i] = element
    result.length++
}

for (var i = 0; i < iterable2.length; i++) {
    var elemnt = iterable2[i]

    result[i] = element
    result.length++
}

for (var i = 0; i < iterable3.length; i++) {
    var elemnt = iterable3[i]

    result[i] = element
    result.length++
}



var abc = ['a', 'b', 'c']
var def = ['d', 'e', 'f']
var ghi = ['g', 'h', 'i']
var abcdefghi = concat(abc, def, ghi)
console.log(abcdefghi)

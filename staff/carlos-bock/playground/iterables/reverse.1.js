//takes an array and reverses it
//modifies the original element;
//use a for loop and iterate it backwards to fill an empty array
//update the original argument to the new array;



function reverse(obj) {
    var newObj = {length:0};
    newObj[length] = obj[length];
    var counter = 0;
    //create shallow copy without spread operator
    for (var j = 0; j < obj.length; j++) {
        newObj[j] = obj[j];
        
    }
    // use shallow copy to move over values
    for (var i = obj.length -1; i > -1; index--) {
        obj[counter] = newObj[i];
        counter++;        
    }
    return obj;
}
//tdd 

var arr1 = [1, 2, 3, 4, 5, 6, 7];
var arr2 = [false, false, true, false];


//console.log(reverse(arr1));
//console.log(reverse(arr2));


var obj1 = {0: true, 1: true, 2: true, 3: false, length: 4}
var obj2 = {0: "a", 1: "b", 2: "c", length:3}

console.log(reverse(obj1));
console.log(reverse(obj2));

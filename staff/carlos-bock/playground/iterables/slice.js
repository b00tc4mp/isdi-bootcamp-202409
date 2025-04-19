
var slice = function (iterable) {
    var newObj = {};
    var counter = 0;
    var number1 = 0;
    var number2 = iterable.length;

    if (arguments[1] < 0) {number1 = iterable.length + arguments[1]}
        else if (arguments[1] > 0) {number1 = arguments[1]};
    if (arguments[2] < 0) {number2 = iterable.length + arguments[2]}
        else if (arguments[2] > 0) {number2 = arguments[2]};


    for (var i = number1; i < number2; i++) {
        newObj[counter] = iterable[i];
        counter++;
    }
    newObj.length = counter-1;
    return newObj;
}
//debugger;
// sección tdd

var obj4 = {0:'one', 1:'two', 2:'three', 3:'four', 4:'five', 5:'six', 6:'seven', 7:'eight', length: 8};
var result4 = slice(obj4,2);
console.log(result4);
console.log(slice(obj4,-2));
console.log(slice(obj4,1,5));



var obj1 = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, length: 8};
var result1 = slice(obj1,2);
//console.log(result1);

var obj2 = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, length: 8}
var result2 = slice(obj2,-2)
//console.log(result2);


var obj3 = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, length: 8}
var result3 = slice(obj3,1,5)
//console.log(result3);

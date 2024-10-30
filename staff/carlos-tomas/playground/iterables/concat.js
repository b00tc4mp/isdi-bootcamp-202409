var concat = function (obj1, obj2) {
    for (var i = 0; i < obj2.length; i++) {
        obj1[obj1.length + i] = obj2[i]
    }
    obj1.length = obj1.length + obj2.length
    return obj1
}




console.log("Test concat with object")



var array1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var array2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 };

var array3 = concat(array1, array2)


console.log(array3)
// array3 = {0:'a', 1:'b', 2:'c' 3:'d', 4:'e', 5:'f', length:6}
function concat(obj1, obj2) {
    var newObj = {};
    var index = 0;

    // Copy elements from obj1
    for (var i = 0; i < obj1.length; i++) {
        newObj[index] = obj1[i];
        index++;
    }

    // Copy elements from obj2
    for (var i = 0; i < obj2.length; i++) {
        newObj[index] = obj2[i];
        index++;
    }

    newObj.length = index;
    return newObj;
}

console.log('TEST concat')

console.log('CASE concatenate obj1 with obj2')

var obj1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var obj2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 };
var obj3 = concat(obj1, obj2);

console.log(obj3);
// { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", length: 6 }
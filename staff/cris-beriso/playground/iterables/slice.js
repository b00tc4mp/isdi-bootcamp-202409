var slice = function (iterable, start, end) {
    var result = { length: 0 };
    if (arguments.length === 1) start = 0;
    var startIndex = (start >= 0 ? start : (iterable.length + start))
    var endIndex = (end > 0 ? end : end < 0 ? end + iterable.length : iterable.length);
    for (var i = startIndex; i < endIndex; i++) {
        result[result.length] = iterable[i];
        result.length++;
    }
    return result;
}

console.log("TEST slice");

console.log("CASE copy the object from index 2");

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
console.log(slice(animals, 2));
// { 0: 'camel', 1: 'duck', 2: 'elephant', length: 3 }

console.log("CASE copy from index 2 to 4");

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
console.log(slice(animals, 2, 4));
// { 0: 'camel', 1: 'duck', length: 2}

console.log("CASE copy from index -2");

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
console.log(slice(animals, -2));
// { 0: 'duck', 1: 'elephant', length: 2}

console.log("CASE copy from index 2 to index -1");

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
console.log(slice(animals, 2, -1));
// { 0: 'camel', 1: 'duck', length: 2}

console.log("CASE copy without parameters")
var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
console.log(slice(animals));
// (5) { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var indexOf = function (iterable, element, fromIndex) {

    for (
        var i = (arguments.length === 2 ? 0 : (fromIndex >= 0 ? fromIndex : fromIndex + index));
        i < iterable["length"];
        i++
    ) {
        if (iterable[i] === element) {
            return i;
        }
    }
    return -1;
}

console.log("TEST indexOf")
console.log("CASE locate the index of the value 8")

var numbers = {
    0: 2,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
    5: 8,
    length: 6
}

var index = indexOf(numbers, 8);
console.log(index);
// 2

console.log("CASE value 17 not found");
index = indexOf(numbers, 17);
console.log(index);
// -1

console.log("CASE locate the index of the second value 8")
index = indexOf(numbers, 8, 3);
console.log(index);
// 5

console.log("CASE locate the index from a negative value");
index = indexOf(numbers, 4, -6);
console.log(index)
// 1
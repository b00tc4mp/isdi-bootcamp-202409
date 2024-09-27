var lastIndexOf = function (iterable, searchElement, fromIndex) {

    for (var i = (arguments.length === 2 ? iterable["length"] - 1 : (fromIndex >= 0 ? fromIndex : (iterable["length"] - 1 + fromIndex)));
        i >= 0;
        i--
    ) {
        var element = iterable[i]

        if (element === searchElement) return i
    }
    return -1
}

console.log("CASE get last index of 'a'")

var chars = { 0: "a", 1: "b", 2: "c", 3: "a", 4: "d", length: 5 }
var lastIndex = lastIndexOf(chars, "a")
console.log(lastIndex)
// 3

console.log("CASE get last index of 'a' from index 2")

var chars = { 0: "a", 1: "b", 2: "c", 3: "a", 4: "d", length: 5 }
var lastIndex = lastIndexOf(chars, "a", 2)
console.log(lastIndex)
// 0

console.log("CASE get last index of 'a' from index -3")
var chars = { 0: "a", 1: "b", 2: "c", 3: "a", 4: "d", length: 5 }
var lastIndex = lastIndexOf(chars, "a", -3)
console.log(lastIndex)
// 0

console.log("CASE index of 'd' from -2 not found")
var chars = { 0: "a", 1: "b", 2: "c", 3: "a", 4: "d", length: 5 }
var lastIndex = lastIndexOf(chars, "d", -2)
console.log(lastIndex)
// -1
console.log("TEST find")
//
var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        var found = callback(element)

        if (found) return element
    }
}

console.log("CASE comparate array1 for element")

var obj = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }


var found = find(obj, function (element) { return element > 10 })

console.log(found);
// Expected output: 12

var found = find(obj, function (element) { return element > 100 })
console.log(found)

//Expected output: 130


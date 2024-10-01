var reverse = function (iterable) {
    for (var i = iterable.length - 1; i > -1; i--) {
        obj[obj.length] = iterable[i]
        obj.length++

    }

    iterable = obj
    return iterable

}
console.log("TEST  reverse ")

console.log("CASE que toda el objeto cambie de sentido ")


var obj1 = { 0: 'one', 1: 'two', 2: 'three', length: 3 };

var obj = { length: 0 }

var reversed = reverse(obj1);

console.log(reversed)
// Expected output: "reversed:" Array ["three", "two", "one"]



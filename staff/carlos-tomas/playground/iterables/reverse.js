var reverse = function (iterable) {
    for (var i = iterable.length - 1; i > -1; i--) {
        obj[obj.length] = iterable[i]
        obj.length++
    }
    iterable = obj
    obj1 = obj
    return iterable

}
console.log("TEST  reverse ")

console.log("CASE que toda el objeto cambie de sentido ")


var obj1 = { 0: 'one', 1: 'two', 2: 'three', 3: "four", 4: "five", 5: "six", length: 6 };

var obj = { length: 0 }

var reversed = reverse(obj1);

console.log(reversed)
// Expected output: "reversed:" {0:"six", 1:"five", 2:"four", 3: "th"}

console.log(obj1 === reversed)
//True
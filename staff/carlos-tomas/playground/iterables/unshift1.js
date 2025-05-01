var unshift = function (iterable, element) {

    for (let i = iterable.length; i > 0; i--) {
        iterable[i] = iterable[i - 1]
        iterable[0] = element;
        iterable.length++
        return iterable
    }
}

console.log("TEST array.prototype.unshift")

console.log("CASE")


var obj = { 0: 1, 1: 2, 2: 3, length: 3 }

var obj1 = unshift(obj, 4)



console.log(obj1);
// Expected output: obj1 {0:4, 1:1, 2:2, 3.4 length 4}


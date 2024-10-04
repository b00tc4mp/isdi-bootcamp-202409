var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.lentgh; i++)
        var element = iterable[i]

    callback(element)
}



console.log("TEST Array.prototype.forRach")

console.log("CASE print characters in iterable")

var chars = { 0: "a", 1: "b", 2: "c", length: 3 }

chars.forEach(function (element) { console.log(element) })

//expected ouput: "a"
//expected ouput: "b"
//expected ouput: "c"

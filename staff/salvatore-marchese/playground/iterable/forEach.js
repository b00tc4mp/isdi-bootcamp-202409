var array1 = ['a', 'b', 'c'];

console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in iterable')

chars.forEach(function (element) { 
    console.log(element)
})

//array1.forEach((element) => console.log(element));//

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

var forEach = function (iterable, cllback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        callback(element)
    }
}




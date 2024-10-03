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


var chars = new Raid 

chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars.length = 3

var Raid = function ( ) {this.length = 0}

Raid.prototype.forEach = function (callback) {
    for ( var i = 0; i < this.length; i++) {
        callback(element)
    }
}


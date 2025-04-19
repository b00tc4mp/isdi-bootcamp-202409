console.log("TEST Array.prototype.forRach")

console.log("CASE print characters in array")

var chars = ["a", "b", "c"]

chars.forEach(function (element) { console.log(element) })

//expected ouput: "a"
//expected ouput: "b"
//expected ouput: "c"

//----------------------------------------------------- 
var numbers = [2, 4, 6]

var myForEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        callback(iterable[i])
    }
}

var obj = { length: 0 }
obj[0] = "a";
obj[1] = "b";
obj[2] = "c";
obj.length = 3

myForEach(obj, function (char, index) {
    console.log("index " + index + ": " + char)  //console.log(`index ${index}: ${char}`)    "js 6"
})
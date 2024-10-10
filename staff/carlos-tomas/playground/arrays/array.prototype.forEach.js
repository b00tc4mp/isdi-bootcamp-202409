console.log("TEST Array.prototype.forEach")

console.log("CASE print characters in array")

var chars = ['a', 'b', 'c']

// chars.forEach(function (element) { console.log(element) })
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

var printElement = function (element) { console.log(element) }

chars.forEach(printElement)

console.log("CASE sum numbers form array")

var nums = [100, 200, 300]
var result = 0

nums.forEach(function (num) {
    result += num
})

console.log(result)
console.log('TEST Array.prototype.forEach')
// forEach es una función que llama a otra función y se ejecuta en cada elemento del array, es decir si tengo 3 elementos en el array1 (a,b,c) la function con la que llamo el forEach se le aplicará a a, b y c.

console.log('CASE print characters in array')

var chars = ['a', 'b', 'c']

// chars.forEach(function (element) { console.log(element) })
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

var printElement = function (element) { console.log(element) }

chars.forEach(printElement)

console.log('CASE sum numbers from array')

var nums = [100, 200, 300]
var result = 0

nums.forEach(function (num) {
    result += num
})
console.log(result)
// 600
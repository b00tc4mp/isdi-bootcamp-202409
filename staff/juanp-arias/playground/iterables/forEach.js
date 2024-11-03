console.log('TEST forEach')
// forEach es una función que llama a otra función y se ejecuta en cada elemento del array, es decir si tengo 3 elementos en el array1 (a,b,c) la function con la que llamo el forEach se le aplicará a a, b y c.

var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)
    }
}

console.log('CASE sum numbers from iterable')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var result = 0

forEach(nums, function (num) {
    result += num
})
console.log(result)
// 600

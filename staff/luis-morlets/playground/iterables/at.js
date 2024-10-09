var at = function (iterable, index) {

    var element = iterable[index >= 0 ? index : index + iterable.length]

    return element
}

console.log('TEST at')

console.log('CASE get number at index 3 in nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

var num = at(nums, 3)
console.log(num)
//Expected output: 400

console.log('CASE get number at index -3 in nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

var num = at(nums, -3)
console.log(num)
//Expected output: 300

console.log('CASE get number at index -10 in nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

var num = at(nums, -10)
console.log(num)
//Expected output: undefined
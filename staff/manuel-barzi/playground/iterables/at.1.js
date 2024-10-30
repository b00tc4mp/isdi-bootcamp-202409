var at = function (iterable, index) {
    /*
    extract element from iterable at index
    return extracted element
    */

    var element = iterable[index]

    return element
}

console.log('TEST at')

console.log('CASE get number at index 3 in nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

var num = at(nums, 3)
console.log(num)
// 400
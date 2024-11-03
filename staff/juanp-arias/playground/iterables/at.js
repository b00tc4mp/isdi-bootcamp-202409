var at = function (iterable, index) {
    // buscar en el iterable el elemento que se encuentra en el index
    // siempre te va a devolver undefined si no encuentra el index
    return iterable[index >= 0 ? index : index + iterable.length]
}
console.log('TEST at')

console.log('CASE get number at index 3 in nums')

var nums = { 0: 110, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}

var num = at(nums, 3)
console.log(num)
// 400

console.log('CASE get number at index -3 in nums')

var nums = { 0: 110, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}

var num = at(nums, -3)
console.log(num)
// 300

console.log('CASE get number at index -10 in nums')

var nums = { 0: 110, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}

var num = at(nums, -10)
console.log(num)
// undefined

console.log('CASE get number at index 10 in nums')

var nums = { 0: 110, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}

var num = at(nums, 10)
console.log(num)
// undefined
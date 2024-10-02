var find = function (iterable, callback, value) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        //llamo al callback y almaceno el elemento devuelto
        var newValue = callback(element)

        if (newValue > value) {
            return element
        }
    }
}

console.log('TEST Array.prototype.find')


console.log('CASE sum numbers from iterable')

var nums = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

var map1 = function (value) {
    return value
};

var final = find(nums, map1, 10)
console.log(final)
// 16

console.log('CASE sum numbers from iterable')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

var map1 = function (value) {
    return value
};

var final = find(nums, map1, 10)
console.log(final)
// 12
var map = function (iterable, callback) {
    var object = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        //llamo al callback y almaceno el elemento devuelto
        var newValue = callback(element)

        object[object.length] = newValue
        object.length++
    }
    return object

}

console.log('TEST Array.prototype.map')


console.log('CASE sum numbers from iterable')

var nums = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

var map1 = function (element) {
    return element * 2
};

var final = map(nums, map1)
console.log(final)
// { 0: 2, 1: 8, 2: 18, 3: 32, length: 4 }
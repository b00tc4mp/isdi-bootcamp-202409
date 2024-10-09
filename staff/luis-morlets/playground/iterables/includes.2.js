var includes = function (iterable, searchElement) {
    /*
    iterar sobre el iterable
    verificar si nuestro elemento existe dentro del iterable
    return -> boolean
    */

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (element === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST includes')

console.log('CASE check if 2 is included in nums')

var nums = { 0: 1, 1: 2, 2: 3, length: 3 };

console.log(includes(nums, 2));
// Expected output: true

console.log('CASE check if at is included in pets')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };

console.log(includes(pets, 'at'));
// Expected output: false

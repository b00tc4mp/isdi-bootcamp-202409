var includes = function (iterable, searchElement) {
    for (i = 0; i < iterable.length; i++) {
        if (iterable[i] === searchElement) {

            return true
        }
    }

    return false
}

console.log('TEST includes')

console.log('CASE check if "cat" is in "pets" array')

var pets = { 0: 'dog', 1: 'cat', 2: 'bat', length: 3 }

console.log(includes(pets, 'cat'))
// true
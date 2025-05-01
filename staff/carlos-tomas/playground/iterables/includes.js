var includes = function (iterable, searchElement, fromIndex) {
    if (!fromIndex) {
        fromIndex = 0
    } else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    for (var i = fromIndex; i < iterable.length; i++) {
        if (iterable[i] === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST includes')

console.log('CASE check if "cat" is in "pets" array')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }

console.log(includes(pets, 'cat'))
// true

console.log('CASE check if "c" is in "obj" starting from index -2')

var obj = { 0: "a", 1: "b", 2: "c", length: 3 }

console.log(includes(obj, "c", -2))
// true
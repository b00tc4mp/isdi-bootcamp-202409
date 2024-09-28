console.log('TEST function join for iterables')

var join = function (iterable, separator) {
    // concat the string to the previous one, starting from string 2, without separator at first
    //after do it adding a separator

    var result = ""
    if (separator === undefined) {
        separator = ","
    }
    for (i = 0; i < iterable.length; i++) {
        if (i === 0) {
            result = result.concat(iterable[i])
        } else {
            result = result.concat(separator)
            result = result.concat(iterable[i])
        }
    }
    return result
}

console.log('CASE join the value of elements in one single string')

var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 };

var element = join(elements)
console.log(element)

console.log('CASE join the values of elements with "." separator')

var elementdot = join(elements, '.')
console.log(elementdot)

console.log('CASE join the values of elements with "" separator')
var elementnothing = join(elements, '')
console.log(elementnothing)
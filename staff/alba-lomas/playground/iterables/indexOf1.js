


var indexOf = function (iterable, searchelement, fromIndex) {

    if (fromIndex === undefined) {
        fromIndex = 0;
    }
    else if (fromIndex < 0)
        fromIndex = fromIndex + iterable.length;
    

    for (var i = fromIndex; i < iterable.length; i++) {

        var element = iterable[i]

        if (element === searchelement)
            return i
    }
    return -1

}

console.log('TEST indexOf')

console.log('CASE get index of green')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'yellow',
    3: 'green',
    4: 'purple',
    5: 'pink',
    length: 6
}

var index = indexOf(colors, 'green')
console.log(index)


console.log('CASE get index of green from index -2')

index = indexOf(colors, 'green', -2)
console.log(index)

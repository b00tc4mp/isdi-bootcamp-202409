
var includes = function (iterable, searchElement, searchIndex) {

    if (searchIndex === undefined) {
        searchIndex = 0
    } else if (searchIndex > iterable.length) {
        return false;
    } else if (searchIndex < 0) {
        searchIndex = searchIndex + iterable.length
    }

    for (var i = searchIndex; i < iterable.length; i++) {
        if (iterable[i] === searchElement)
            return true
    }
    return false

}

var colors = { 0: 'red', 1: 'blue', 2: 'yellow', length: 3 }
includes(colors, 'blue')
//Expected output: true
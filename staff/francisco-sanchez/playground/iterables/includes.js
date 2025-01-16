var coches = { 0: 'Seat', 1: 'Volkswagen', 2: 'Mercedes', 3: 'Audi', length: 4 };

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
            return true;
    }
    return false
}

console.log(includes(coches, 'Mercedes', -2))


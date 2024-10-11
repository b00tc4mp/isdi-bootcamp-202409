


var lastIndexOf = function (iterable, searchelement, fromIndex) {

    if (fromIndex === undefined) {
        fromIndex = iterable.length - 1
    }
    else if (fromIndex < 0)
        fromIndex = fromIndex + iterable.length;


    for (var i = fromIndex; i > -1; i--) {

        var element = iterable[i]

        if (element === searchelement)
            return i
    }

    return -1
}


var friends = {
    0: 'Laura',
    1: 'Tati',
    2: 'Cris',
    3: 'Laura',
    4: 'Lorena',
    5: 'Raquel',
    length: 6
}

var friend = lastIndexOf(friends, 'Laura')
console.log(friend)
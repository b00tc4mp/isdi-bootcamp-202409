


var Raid = function () {
    this.length = 0
}


Raid.prototype.lastIndexOf = function ( searchelement, fromIndex) {

    if (fromIndex === undefined) {
        fromIndex = this.length - 1
    }
    else if (fromIndex < 0)
        fromIndex = fromIndex + this.length;


    for (var i = fromIndex; i > -1; i--) {

        var element = this[i]

        if (element === searchelement)
            return i
    }

    return -1
}


var friends = new Raid
friends [0] = 'Laura',
friends [1] = 'Tati',
friends [2] = 'Cris',
friends [3] = 'Laura',
friends [4] = 'Lorena',
friends [5] = 'Raquel',
friends.length = 6;


var friend = lastIndexOf(friends, 'Laura')
console.log(friend)



var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function (searchElement, searchIndex) {

    if (searchIndex === undefined) {
        searchIndex = 0
    } else if (searchIndex > this.length) {
        return false;
    } else if (searchIndex < 0) {
        searchIndex = searchIndex + this.length
    }


    for (var i = searchIndex; i < this.length; i++) {
        if (this[i] === searchElement)
            return true;
    }
    return false
}

console.log(includes(coches, 'Mercedes', -2))
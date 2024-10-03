var Raid = function () {
    this.length = 0
}


/*V1
Raid.prototype.join = function () {
    var result = ""
    for (i = 0; i < this.length; i++) {
        if (i === 0)
            result = result + this[i]
        else
            result = result + "," + this[i]
    }
    return result
}
*/

//v2
Raid.prototype.join = function (separator) {
    var result = ""
    if (!separator) {
        for (i = 0; i < this.length; i++) {
            if (i === 0)
                result = result + this[i]
            else
                result = result + "," + this[i]
        }
        return result
    }
    else {
        for (i = 0; i < this.length; i++) {
            if (i === 0)
                result = result + this[i]
            else
                result = result + separator + this[i]
        }
        return result
    }
}

var elements = new Raid

elements[0] = "fire"
elements[1] = "water"
elements[2] = "wind"
elements[3] = "earth"
elements.length = 4

var element = elements.join()
console.log(element)



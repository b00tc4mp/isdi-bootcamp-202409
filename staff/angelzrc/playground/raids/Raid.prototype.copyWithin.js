var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.copyWithin')

Raid.prototype.copyWithin = function (copyIndex, startIndex, endIndex) {

    if (copyIndex < 0) {
        copyIndex = this.length + copyIndex
    }

    if (startIndex < 0) {
        startIndex = this.length + startIndex
    } else if (startIndex === undefined) {
        startIndex = 0
        endIndex = this.length - copyIndex
    } else {
        startIndex = startIndex
    }

    /* startIndex < 0 ? startIndex = this.length + startIndex : startIndex === undefined ? startIndex = 0  endIndex = this.length - copyIndex : startIndex
 */
    endIndex < 0 ? endIndex = this.length + endIndex : endIndex === undefined ? endIndex = this.length : endIndex


    var copiedPart = new Raid
    for (var i = startIndex; i < endIndex; i++) {
        copiedPart[i - startIndex] = this[i]
        copiedPart.length++
    }

    for (var j = 0; j < copiedPart.length; j++) {
        this[copyIndex + j] = copiedPart[j]
    }

    return this

}





var raid1 = new Raid('a', 'b', 'c', 'd', 'e', 'f');

console.log(raid1.copyWithin(1, 4, 6));

// Copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]

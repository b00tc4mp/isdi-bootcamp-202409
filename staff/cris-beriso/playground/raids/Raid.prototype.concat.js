var Raid = function () {
    this.length = 0
}

Raid.prototype.concat = function () {
    var result = new Raid
    for (var i = 0; i < this.length; i++) {
        result[result.length] = this[i];
        result.length++;
    }
    for (var j = 0; j < arguments.length; j++) {
        for (var k = 0; k < arguments[j].length; k++) {
            result[result.length] = arguments[j][k]
            result.length++
        }
    }
    return result;
}

console.log("TEST Raid.prototype.concat");

console.log("CASE concat two objects");

var firstObj = new Raid
firstObj[0] = "a"
firstObj[1] = "b"
firstObj[2] = "c"
firstObj.length = 3

var secondObj = new Raid
secondObj[0] = "d"
secondObj[1] = "e"
secondObj[2] = "f"
secondObj.length = 3

var concatObj = firstObj.concat(secondObj);
console.log(concatObj);
// Raid { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", length: 6 }

console.log("CASE concat three objects");

var firstObj = new Raid
firstObj[0] = "a"
firstObj[1] = "b"
firstObj[2] = "c"
firstObj.length = 3

var secondObj = new Raid
secondObj[0] = "d"
secondObj[1] = "e"
secondObj[2] = "f"
secondObj.length = 3

var thirdObj = new Raid
thirdObj[0] = 1
thirdObj[1] = 2
thirdObj.length = 2

var concatObj = firstObj.concat(secondObj, thirdObj);
console.log(concatObj);
// Raid { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: 1, 7: 2, length: 8 }
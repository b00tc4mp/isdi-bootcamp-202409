var Raid = function () {
    this.length = 0
}
Raid.prototype.concat = function () {

    var result = { length: 0 }
    for (var j = 0; j < this.length; j++) {
        var raidx = arguments[j]
        for (var i = 0; i < raidx.length; i++) {
            var element = raidx[i]
            result[result.length] = element
            result.length++
        }
    }
}

var abc = new Raid
abc[0] = "a"
abc[1] = "b"
abc[2] = "c"
abc.length = 3

var def = new Raid
def[0] = "d"
def[1] = "e"
def[2] = "f"
def.length = 3

var abcdef = abc.concat(def)

console.log(abcdef)
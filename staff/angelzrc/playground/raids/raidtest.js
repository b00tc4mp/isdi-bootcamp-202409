var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

var abc = new Raid('a', 'b', 'c')
var defg = new Raid('d', 'e', 'f', 'g')

console.log(abc)
// output: Raid {0: 'a', 1: 'b', 2: 'c', length: 3}
console.log(defg)
// output: Raid {0: 'd', 1: 'e', 2: 'f', 3: 'g', length: 4}

var new1 = new Raid()
console.log(new1)
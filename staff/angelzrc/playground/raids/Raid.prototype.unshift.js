var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.unshift')
Raid.prototype.unshift = function(element) {
    
    for (j = arguments.length-1; j >= 0; j--){ 
        
        for (var i = this.length; i >= 0; i-- ) {
        this[i] = this[i-1]
        }
        this[0] = arguments[j]
        this.length++
    }
    return this.length
}


console.log('CASE add element at the start on raid')
var raid1 = new Raid(1, 2, 3);
var length1 = raid1.unshift(4);

console.log(length1)
//4
console.log(raid1)
//Raid {0: 4, 1: 1, 2: 2, 3: 3, length: 4}
console.log('CASE add two element at the start of the raid')

var raid2 = new Raid(1, 2, 3)
var length2 = raid2.unshift('a', 'b')

console.log(length2)
//5
console.log(raid2)
//Raid {0: 'a', 1: 'b', 2: 1, 3: 2, 4: 3, length: 5}
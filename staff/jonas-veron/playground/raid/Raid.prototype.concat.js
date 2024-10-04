console.log('TEST Raid.prototype.concat')

var Raid = function(){
    this.length = 0
}

Raid.prototype.concat = function(){
var sum = new Raid
for( var k = 0; k < this.length; k++){
sum[sum.length] = this[k]
sum.length++
}
    for (var i = 0; i < arguments.length; i++){
        for(var j = 0; j < arguments[i].length; j++){
            sum[sum.length] = arguments[i][j]
            sum.length++
        }
    }
    return sum
}

console.log('TEST Array.prototype.concat')
console.log('CASE concat an array to two arrays')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters.length = 3

var numbers = new Raid
numbers[0] = 1
numbers[1]= 2
numbers[2] = 3
numbers.length = 3

var sum = letters.concat(numbers)
console.log(sum)


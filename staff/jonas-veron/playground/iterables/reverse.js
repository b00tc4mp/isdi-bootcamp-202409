console.log('TEST Array.prototype.reverse')

var reverse = function(iterable){
    var result = {}
    var newLength = iterable.length  - 1
    for( var i = 0; i <= iterable.length - 1; i++){
        result[i] = iterable[newLength - i]
        result.length = iterable.length
    }
    return result
}



var nums = {0: 100, 1: 200, 2: 300, length: 3}
console.log(nums);
// {0: 100, 1: 200, 2: 300, length: 3}


console.log('Revertir los elementos en nums')


var reversed = reverse(nums);
console.log(reversed);
// {0: 300, 1: 200, 2: 100, length: 3}
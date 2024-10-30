const array1 = ['one', 'two', 'three'];
console.log('array1:', array1);
// Expected output: "array1:" Array ["one", "two", "three"]

const reversed = array1.reverse();
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]


var reverse = function (iterable){
    var arrayr =[];
    arrayr.length = iterable.length;
    var j = 0
    for( i = iterable.length-1; i >= 0; i--){ //se puede escribir tambien(i = iterble.length-1; i > -1; i--)
        arrayr[j] = iterable[i];
        j++;
    }
    for (var i = 0 ; i <arrayr.length;i++){
        iterable[i] = arrayr[i];
    }
    return iterable;
}

//expected ['three', 'two', 'one']


// example from Manu ( 2 elementos)
var reverse = function (iterable){
    var arrayr =[];
    arrayr.length = iterable.length;
    var j = 0
    for(i = iterble.length-1; i > -1; i--){
        arrayr[j] = iterable[i];
        j++;
    }
    for (var i = 0 ; i <arrayr.length;i++){
        iterable[i] = arrayr[i];
    }
    return iterable;
}

//example with 2 or more items 

var reverse = function (iterable) {
    if (iterable.length === 2) {
        var element = iterable[1]
        iterable[1] = iterable[0]
        iterable[0] = element
} else if (iterable.length === 3) {
        var element = iterable[2]
        iterable[2] = iterable[0]
        iterable[0] = element
} else if (iterable.length === 4) {
        var element = iterable[3]
        iterable[3] = iterable[0]
        iterable[0] = element
}

return iterable;

// do the same with a "for element".

for (var i = iterable.length - 1; i > Math.floor(iterable.lemght/2); i--) {
    var element = iterable[i]
    iterable[i] = iterable[iterable.length - 1 - i]
    iterable[iterable.length - 1 - i] =  element
}
return iterable 
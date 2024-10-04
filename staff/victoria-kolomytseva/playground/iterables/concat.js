console.log('Case concat 2 arrays of caracters')

var concat = function (iterable, iterable2) {
    /*
    iterable => {0:'a', 1: 'b', 2:'c', length: 3}
    iterable2 => {0: 'd', 1: 'e', 2:'f', length: 3}
    return - result
    */
    var result = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        element = iterable[i]
        result[result.length] = element;
        result.length++

    } for (var i = 0; i < iterable2.length; i++) {
        element = iterable2[i]
        result[result.length] = element;
        result.length++
    }
    result
        ;

    return
}




abc
var   = 0{: 'a', 1: 'b', 2: 'c', length: 3 };
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 };
var abcdef = concat(abc, def);

console.log(abcdef);
// Expected output:  {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", length: 6}
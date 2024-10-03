var reverse = function (iterable) {
    /*
    recorrer el objeto y
    devolverlo con los elementos en orden inverso
    */

    /*
    if (iterable.length === 2) {
        var element = iterable[1]
        iterable[1] = iterable[0]
        iterable[0] = element
    } else if (iterable.length === 3) {
        var element = iterable[2]
        iterable[2] = iterable[0]
        iterbale[0] = element 
    } else if (iterbale.length === 4) {
        var element = iterbale[3]
        iterbale[3] = iterable[0]
        iterable[0] = element
        element = iterable[2]
        iterable[2] = iterable[1]
        iterable[1] = element
    } else if (iterable.length === 5) {
        var element = iterable[4]
        iterable[4] = iterable[0]
        iterable[0] = element
        element = iterable[3]
        iterable[3] = iterable[1]
        iterable[1] = element
    }
    */
    /*
    for (var i = iterable.length - 1; i > Math.floor((iterable.length - 1)/2); i--) {
        var element = iterable[i]
        iterable[i] = iterable[iterable.length - 1 - i]
        iterable[iterable.length - 1 - i] = element
    }
    return iterable
    */

    for (var i = 0; i < Math.floor(iterable.length / 2); i++) {
        var element = iterable[i]
        iterable[i] = iterable[iterable.length - 1 - i]
        iterable[iterable.length - 1 - i] = element
    }
    return iterable
}
console.log("TEST reverse");

console.log("CASE reverse nums");

var nums = { 0: "one", 1: "two", 2: "three", length: 3 };
var reversed = reverse(nums);
console.log(reversed);
// ["three", "two", "one"]
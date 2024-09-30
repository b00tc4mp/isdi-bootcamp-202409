var reverse = function (iterable) {
    /*
    recorrer el objeto y
    devolverlo con los elementos en orden inverso
    */
    var newObj = { length: 0 }
    for (var i = iterable.length - 1; i > -1; i--) {
        newObj[newObj.length] = iterable[i]
        newObj.length++;
    }
    return newObj;
}
console.log("TEST reverse");

console.log("CASE reverse nums");

var nums = { 0: "one", 1: "two", 2: "three", length: 3 };
var reversed = reverse(nums);
console.log(reversed);
// ["three", "two", "one"]
//Nuestra función
var indexOf = function (iterable, searchElement, startIndex) {
    /*
    if (startIndex === undefined) {
        //if (!startIndex){ }... -> El if también se podría indicar como negativa. 
        //Si startIndex NO está iniciado... 
        startIndex = 0;

    } else if (startIndex < 0) {
        startIndex = iterable.length + startIndex;
    }
    */

    //El if ternario que hay dentro del for podría sustituir el if de arriba que dejo comentado
    for (var i = (arguments.length === 2 ? 0 : (startIndex >= 0 ? startIndex : startIndex + iterable.length));
        i < iterable.length; i++) {

        if (iterable[i] === searchElement) return i;

    }
    return -1;
}

console.log("TEST indexOf");

console.log('Case of index c ')
var veggies = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    length: 5
};



console.log("CASE: If we use c the function shoult return 2.")
console.log(indexOf(veggies, 'c'));

console.log("CASE: If we use e the function from index 3, shoult return 4.")
console.log(indexOf(veggies, 'e', 3));

console.log("CASE: If we use z the function, shoult return -1.")
console.log(indexOf(veggies, 'z'));

console.log("CASE: If we find d with negative index (-3) the function shoult return 3.")
console.log(indexOf(veggies, 'd', -3));


console.log("CASE: If we find kale with negative index > -array.length (-10) the function shoult return 3.")
console.log(indexOf(veggies, 'd', -10));


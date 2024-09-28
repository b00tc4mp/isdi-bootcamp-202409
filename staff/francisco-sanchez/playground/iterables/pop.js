//Create a function than remove the last element of any array
var pop = function (iterable) {
    //seleccionamos eliminamos y devolvemos el ultimo elemento del array
    var deleteElement = iterable[iterable.length - 1];
    delete iterable[iterable.length - 1];
    iterable.length--;

    return deleteElement;
}

var plants = {
    0: 'broccoli',
    1: 'cauliflower',
    2: 'cabbage',
    3: 'kale',
    4: 'tomato',
    length: 5
};

console.log("CASE: Remove and return the last element of array plants")
var deletedItem = pop(plants);
console.log(deletedItem);
console.log(plants);
// Expected output: "tomato"
var pop = function (iterable, element) {
    //extract last element from iterable
    var lastElement = iterable[iterable.length - 1]

    //delete last element from iterable
    delete lastElement

    //decrease length from iterable
    iterable.length--

    //return extracted element
    return lastElement
}

const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]


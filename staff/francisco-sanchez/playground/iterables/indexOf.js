var veggies = {
    0: "tomato",
    1: "pumkin",
    2: "pepper",
    3: "kale",
    4: "pepper",
    length: 5
};

var indexOf = function (iterable, element, startIndex) {
    if (startIndex === undefined) {
        //if (!startIndex){ }... -> El if también se podría indicar como negativa. 
        //Si startIndex NO está iniciado... 
        startIndex = 0;

    } else if (startIndex < 0) {
        startIndex = iterable.length + startIndex;
    }

    for (var i = startIndex; i < iterable.length; i++) {
        if (iterable[i] === element) {
            return i;
        }
    }
    return -1;



}

console.log("CASE: If we use pepper the function shoult return 2.")
console.log(indexOf(veggies, 'pepper'));

console.log("CASE: If we use pepper the function from index 3, shoult return 4.")
console.log(indexOf(veggies, 'pepper', 3));

console.log("CASE: If we use rapsberry the function, shoult return -1.")
console.log(indexOf(veggies, 'rapsberry'));

console.log("CASE: If we find kale with negative index (-3) the function shoult return 3.")
console.log(indexOf(veggies, 'kale', -3));


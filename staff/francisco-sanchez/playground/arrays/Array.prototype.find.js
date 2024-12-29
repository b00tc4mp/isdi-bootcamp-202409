console.log("Array.prototype.find");

console.log("Find first element > 10")

const array1 = [5, 12, 8, 130, 44];

//la función de abajo se podría resumir en una sola linea usando una función flecha: 
// const found = array1.find((element) => element > 10);

const found = array1.find(function (element) {
    return element > 10
});

console.log(found);
// Expected output: 12
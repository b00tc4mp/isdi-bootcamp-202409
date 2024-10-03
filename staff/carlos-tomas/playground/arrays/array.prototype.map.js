console.log("TEST array.prototype.maps")

console.log("CASE map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos")


const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]

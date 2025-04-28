var at = function(iterable, index){
    // buscar en el iterable el elemento que se encuentra en el index//
    //siempre return undfined si no encuentra el index//
    if(index > -1){
        return iterable[index]
    }
    else {
        return iterable[iterable.length + index]
    }
}
const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`An index of ${index} returns ${array1.at(index)}`);
// Expected output: "An index of 2 returns 8"

index = -2;

console.log(`An index of ${index} returns ${array1.at(index)}`);
// Expected output: "An index of -2 returns 130"//



let num = [1, 3, 5, 7 ,9];


 console.log(num(3))

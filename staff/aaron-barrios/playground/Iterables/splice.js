function splice(iterable, targetIndex, deleteCount, item) {
    /*
       - Definir el iterable
       - modificas el iterable (ES EL MISMO)
       - asignas un indice target (posición donde vas a colocar el item)
       - asignas un delete Count. Si es 0, no borras nada, si es 1 borras el que está en 
         el mismo índice, si es 2+ borras el de tu indice hacia la derecha  

         - si solo pones un numero sin item se muestra hasta ese indice, borrando quitando ese indice
        */

    //CASE 0: SOLO TIENES EL TARGET INDEX: TE MUESTRA DESDE ESE INDICE + 1

    if (!deleteCount && !item) {
        for (var i = targetIndex; i < iterable.length; i++) {
            var object = { length: 0 }

            object[object.length] = iterable[i]
            object.length++
            delete iterable[i]
        }

        return object
    }

}

console.log('TEST splice')


console.log('CASE splice nums since index 1')
var nums = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };

var case1 = splice(nums, 1)
console.log(case1)
//EXPECTED OUTPUT
// var nums = { 0: 1 length: 1 };

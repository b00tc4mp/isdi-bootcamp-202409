function splice(iterable, startIndex, deleteCount) {
    /*
       - Definir el iterable
       - modificas el iterable (ES EL MISMO)
       - asignas un indice target (posición donde vas a colocar el item)
       - asignas un delete Count. Si es 0, no borras nada, si es 1 borras el que está en 
         el mismo índice, si es 2+ borras el de tu indice hacia la derecha  

         - si solo pones un numero sin item se muestra hasta ese indice, borrando quitando ese indice
        */

    //CASE 0: SOLO TIENES EL TARGET INDEX: TE ELIMINA TODO DESDE ESE INDICE HASTA EL FINAL

    if (arguments.length === 2) {

        var removedObject = { length: 0 }

        for (i = startIndex; i < iterable.length; i++) {
            var element = iterable[i]
            delete iterable[i]

            removedObject[removedObject.length] = element
            removedObject.length++
        }
        iterable.length -= removedObject.length
        return removedObject
    }
    else if (arguments.length === 3) {

        var removedObject = { length: 0 }

        //RECORREMOS HASTA EL DELETECOUNT DESDE EL START SIN INCLUIR EL DELETE COUNT
        for (var i = startIndex; i < startIndex + deleteCount; i++) {

            var element = iterable[i]

            removedObject[removedObject.length] = element
            removedObject.length++
        }

        //actualizamos los indices de los que quedan detras
        for (var i = startIndex + deleteCount; i < iterable.length; i++) {
            var element = iterable[i]

            iterable[i - deleteCount] = element

            // if (i === (iterable.length - deleteCount)) {
            //     delete iterable[i]
            // }
        }

        for (i = iterable.length - deleteCount; i < iterable.length; i++) {
            delete iterable[i]
        }

        iterable.length -= deleteCount
        return removedObject
    }

}

console.log('TEST splice')


console.log('CASE remove nums since index 3')
var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 };

var extracted = splice(nums, 3)
console.log(extracted)
//EXPECTED OUTPUT
// var extracted = { 0: 400, 1: 500, 2: 600, 3: 700, length: 4 };

console.log(nums)
//EXPECTED OUTPUT
// var nums = { 0: 100, 1: 200, 2: 300, length: 3 };


console.log('CASE remove nums since index 1, 2')
var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 };

var extracted = splice(nums, 1, 2)
console.log(extracted)
console.log(nums)




function copyWithin(iterable, targetIndex, startIndex, endIndex) {
    /*
       - Definir el iterable
       - modificas el iterable (ES EL MISMO)

         CASE 1 (ITERABLE + TARGET INDEX)
         SE COPIA EL INDICE 0 EN EL TARGET INDEX 

         CASE 2 (ITERABLE + TARGET INDEX + STARTINDEX)
         SE COPIA TODO LO PERTENECIENTE DESDE EL START HASTA EL FINAL EN EL TARGET INDEX

         CASE 3 (ITERABLE + TARGET INDEX + STARTINDEX + ENDINDEX)
         SE COPIA TODO LO PERTENECIENTE DESDE EL START HASTA EL ENDINDEX EN EL TARGET INDEX

         --- EN CASO DE TENER UN ARRAY MUY LARGO SE COPIA HASTA EL END INDEX O FINAL Y 
         ---- SI NO QUEDA MAS QUE COPIAR SE MUESTRAN LOS VALORES DE LOS INDICES DEL ARRAY
        */

    //CASE 1
    if (!startIndex && !endIndex) {
        iterable[targetIndex] = iterable[0];
    }


    return iterable
}
console.log('TEST copyWithin')


console.log('CASE JUST TARGET INDEX')
var nums = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };

var case1 = copyWithin(nums, 1)
console.log(case1)
//EXPECTED OUTPUT
// var nums = {  0: 1, 1: 1, 2: 3, 3: 4, length: 4 };



//PRIMER CASO
//recorrer todo el iterable
//si el iterable coincide con el elemento return true, sino return false
//SEGUNDO CASO
// si fromIndex != 0, empezar a buscar desde ese indice
// si fromIndex es negativo (iterable.length + fromIndex)


var includes = function (iterable, element, fromIndex){

        for(i = fromIndex === undefined ? 0 
            : fromIndex < 0 ? iterable.length + fromIndex
            : fromIndex; i < iterable.length;
            i++){
            if(iterable[i] === element){
                return true
            }
        }
    return false
}

console.log('CASE array includes element')

var letters = {0: 'a', 1: 'b', 2: 'c', length: 3};

var result = includes(letters, 'b');
console.log(result)
//true



console.log('CASE array includes element fromIndex')

var letters1 = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4:'e', length: 5}

var result1 = includes(letters1, 'd', 2)
console.log(result1)
//true

console.log('CASE array includes element negative fromIndex')

var letters1 = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4:'e', length: 5}

var result1 = includes(letters1, 'd', -2)
console.log(result1)
//true
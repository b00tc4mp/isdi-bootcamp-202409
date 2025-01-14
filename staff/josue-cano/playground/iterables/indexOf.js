var indexOf = function(iterable, element,fromIndex){
    if(!fromIndex){
        index=0;
    }
    else if(fromIndex<0){
        fromIndex=iterable.length+fromIndex;
    }
    
    for(var i=fromIndex ; i<iterable.length;i++){
        if(iterable[i]===element){
            return i;
        }
    }

    return -1;  // Elemento no encontrado en el iterable
    } 
   

console.log('Test IndexOF');

var coches = {
    0: 'Fiat',
    1: 'Ford',
    2: 'Chevrolet',
    3: 'Volkswagen',
    4: 'Toyota',
    length: 5
}
console.log('Caso 1 elemento encontrado');
console.log(indexOf(coches, 'josue', -30)); // 1

console.log('Caso 2 elemento no encontrado');

console.log(indexOf(coches, 'BMW')); // -1
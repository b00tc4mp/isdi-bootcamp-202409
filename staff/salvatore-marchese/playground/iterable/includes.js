

console.log(array1.includes(2));
// Expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false


const array1 = {0: 1,1: 2,2: 3, length: 3};
//encontar el elemento para que nos de true o false

var includes = function(iterable, element) {
    for(var i = 0; i < iterable.length; i ++){
        if(iterable[i] === element){
            return true;
        }    
    }  return false; 
}

var includes = function(iterable, element,fromIndex) {
    if (fromIndex < -iterable.length || !fromIndex){fromIndex = 0}
    else if (fromIndex < 0){
        fromIndex = iterable.length + fromIndex
    }
    for(fromIndex; fromIndex < iterable.length; fromIndex ++){
        if(iterable[fromIndex] === element){
            return true;
        }    
    }  return false; 
}
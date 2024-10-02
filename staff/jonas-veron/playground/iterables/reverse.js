console.log('TEST Array.prototype.reverse')

var reverse = function(iterable){
//un for con la condicion a la mitad
    for(var i = 0; i < Math.floor((iterable.length) / 2); i++){ 
        var element = iterable[i]//usamos una variable auxiliar para guardar el elemento
        iterable[i] = iterable[iterable.length - 1 - i]//igualamos el primer elemento con el ultimo
        iterable[iterable.length - 1 - i] = element //al ultimo le asignamos el elemento guardado
    }
    return iterable
}


var nums = {0: 100, 1: 200, 2: 300, length: 3}
console.log(nums);
// {0: 100, 1: 200, 2: 300, length: 3}


console.log('Revertir los elementos en nums')

var reversed = reverse(nums);
console.log(reversed);
// {0: 300, 1: 200, 2: 100, length: 3}

console.log(nums === reversed)

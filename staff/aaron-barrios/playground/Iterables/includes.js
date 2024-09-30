
function includes(iterable, searchElement) {
    /*
        - buscar el elemento en el objeto
        - en caso de que existe devolver un true
        - si no existe devuelves un false 
    */
    for (i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        if (element === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST includes')


console.log('CASE check -2- value of pets')

var nums = { 0: 1, 1: 2, 2: 3, length: 3 };
console.log(includes(nums, 2));
// Expected output: true


console.log('CASE check -cat- value of pets')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };
console.log(pets.includes('cat'));
// Expected output: true


console.log('CASE check -at- value of pets')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };
console.log(pets.includes('at'));
// Expected output: false
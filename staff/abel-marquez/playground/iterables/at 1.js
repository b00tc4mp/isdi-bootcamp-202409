console.log('CASE get number at index 3 in nums')

var at = function (iterable,index) {

    var element = iterable[index]

    return element
}
// darle la lista 
// devuelve el valor de la posicion

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length : 5}

var nose = at(nums,3)

console.log(nums)
console.log(nose)


/* CASE negative index
    calculate index adding negative index to iterable length
    extract element from iterable at calculated index
    return extracted element
    */

    console.log('CASE get number at index -3 in nums')

    var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }
    
    var num = at(nums, -3)
    console.log(num)
    // 300
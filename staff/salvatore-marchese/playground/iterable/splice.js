console.log('TEST Array.prototype.splice')
console.log('CASE extract elements from index 3')

var nums = [100, 200, 300, 400, 500, 600, 700]
var extracted = nums.splice(3)
console.log(nums)
//[100,200,300]
console.log(extracted)
//[400,500,600,700]


///// otro ejercicio

console.log('CASE extract elements from index 2 n delete 2')

var nums = [100, 200, 300, 400, 500, 600, 700]
var extracted = nums.splice(2, 2)
console.log(nums)
//[100,200,500,600,700]
console.log(extracted)
//[300,400]


console.log('TEST Array.prototype.splice')
console.log('CASE extract elements from index 3')

///// separo info aquí ///

//esto debería ir arriba del todo
var splice = function (iterable, start) {
    var removed = { length: 0 }

    for (var i = start; i < iterable.length; i++) {
        var element = iterable[i]

        delete iterable[i]


        removed[removed.length] = element
        removed.length++
    }
    iterable.length -= removed.length

    return removed

/*    else if (argument.length === 3) {
    var removed =  {length: 0}

    for (var i = start; i < start + deleteCount; i++) {
        var element = iterable[i]

        removed[removed.length] = element
        removed.length++
    }
    iterable.length -= removed.length     */
}



// convertimos en objeto iterable - objeto que es como un array


var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, 3)
console.log(nums)
//{0: 100, 1: 200,2: 300, length: 3 }
console.log(extracted)
//[{0: 400, 1: 500, 2: 600, 3: 700, length: 4 }

///// otro ejercicio

console.log('CASE extract elements from index 1 n delete 2')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, 2,2)
console.log(nums)
//{0: 100, 1: 200,2: 500, 3: 600, 4: 700, length: 5 }
console.log(extracted)
//[{0: 300, 1: 400, length: 2 }

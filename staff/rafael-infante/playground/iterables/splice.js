console.log('TEST iterable/splice')
//recorremos el iterable desde la posicion start para guardar esos elementos en
//una nueva variable removed
// el iterable se reduce y el removed aumenta
// devolvemos el array removed

var splice = function (iterable, start, deleteCount) {
  /*
  iterable -> { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
  start -> 3
  
  removed -> { length: 0 }
  
  
  return removed
  */
  if (arguments.length === 2) {
    var removed = { length: 0 }
    for (var i = start; i < iterable.length; i++) {
      removed[removed.length] = iterable[i]
      removed.length++

      delete iterable[i]
    }

    iterable.length -= removed.length

    return removed
  } else if (arguments.length === 3) {
    /*
    iterable -> { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
    start -> 1
    deletecount -> 2
    */
  }
}

console.log('CASE extract elements from index 3')
var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, 3)
console.log(nums) // { '0': 100, '1': 200, '2': 300, length: 3 }
console.log(extracted) // { '0': 400, '1': 500, '2': 600, '3': 700, length: 4 }

console.log('CASE extract elements from index 1 and delete 2')
var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted2 = splice(nums, 1, 2)
console.log(nums) // { 0: 100, 1: 400, 2: 500, 3: 600, 4: 700 length: 5 }
console.log(extracted2) // { '0': 400, '1': 500, '2': 600, '3': 700, length: 4 }
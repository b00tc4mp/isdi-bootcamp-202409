var splice = function (iterable, start, deleteCount, element) {

    var result = { length: 0 }

    if (deleteCount === 0) {
        for (var i = iterable.length; i > start; i--) {
            result[i] = iterable[i - 1]
            result.length++
        }

        for (var i = 0; i < start; i++) {
            result[i] = iterable[i]
            result[start] = element
            result.length++
        }
        result.length++

        return result
    } else {
        for (var j = iterable.length + 1; j > -1; j--) {
            result[j + 1] = iterable[j]
            result.length++
        }
        result.length++

        return result
    }

}

// start -> { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }
// { 0: 'Jan', 1: undefined, 2: 'March', 3: 'April', 4: 'June', length: 5 }
// { 0: 'Jan', 1: undefined, 2: 'March', 3: 'April', 4: 'May', length: 5 }
// result -> { 0: "Jan", 1: "Feb", 2: "March", 3: "April", 4: "May", length: 5 }

console.log('TEST splice')
// start indicates where to start changing the array
// deleteCount indicates the number of elements to remove from start
// element to add from start

console.log('CASE insert at index 1')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }
var addMonth = splice(months, 1, 0, 'Feb')
console.log(addMonth)
// { 0: "Jan", 1: "Feb", 2: "March", 3: "April", 4: "June", length: 5 }

console.log('CASE replace an element at index 4')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }
var addMonth = splice(months, 4, 1, 'May')
console.log(months)
// { 0: "Jan", 1: "Feb", 2: "March", 3: "April", 4: "May", length: 5 }
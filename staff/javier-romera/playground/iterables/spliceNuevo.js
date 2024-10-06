var splice = function (iterable, start, deleteCount) {
    var removed = { length: 0 }

    //CASE start omitted
    if (arguments.length === 1) {
        return removed
    }

    // CASE start is undefined
    if (start === undefined) { start = 0 }

    if (arguments.length === 2) {
        for (var i = start; i < iterable.length; i++) {
            var element = iterable[i]
            delete iterable[i]

            removed[removed.length] = element
            removed.length++
        }
        iterable.length -= removed.length

        return removed
    } else if (arguments.length === 3) {
        if (deleteCount > (start + iterable.length - 1)) { deleteCount = iterable.length - start }

        for (var i = start; i < (start + deleteCount); i++) {
            var element = iterable[i]

            removed[removed.length] = element
            removed.length++
        }

        // Ahora toca reajustar el iterable.

        for (var i = start + deleteCount; i < iterable.length; i++) {
            var element = iterable[i]

            iterable[i - deleteCount] = element
        }

        for (var i = iterable.length - deleteCount; i < iterable.length; i++) {
            delete iterable[i]
        }

        iterable.length -= removed.length

        return removed
    }

    else if (arguments.length > 3) {
        // if CASE start is negative index
        if (-iterable.length <= start && start < 0) { start = start + iterable.length }
        //else if CASE start is negative and out of index
        else if (start < -iterable.length) { start = 0 }

        // CASE start is equal or bigger than the iterable length
        if (start >= iterable.length) {
            start = iterable.length
            deleteCount = 0
        }

        // CASE deleteCount bigger than the iterable available space (space after start)
        if (deleteCount > (start + iterable.length - 1)) { deleteCount = iterable.length - start }

        // CASE deleteCount is negative or unedfined
        if (deleteCount < 0 || deleteCount === undefined) { deleteCount = 0 }

        // Here the function actually starts xd

        // Make the copy that we will return with the deleted items

        for (var i = start; i < (start + deleteCount); i++) {
            var element = iterable[i]

            removed[removed.length] = element
            removed.length++
        }

        // Readjust the iterable "moving back" the items that are left in the iterable

        for (var i = start + deleteCount; i < iterable.length; i++) {
            var element = iterable[i]

            iterable[i - deleteCount] = element
        }

        // Delete the necessary items

        for (var i = iterable.length - deleteCount; i < iterable.length; i++) {
            delete iterable[i]
        }

        // Readjust the length of the remaining iterable

        iterable.length -= removed.length

        // Make space for the new items

        for (var i = 0; i < arguments.length - 3; i++) {
            for (var j = iterable.length; j > start; j--) {
                iterable[j] = iterable[j - 1]
            }
            iterable.length++
        }

        // Insert the new items

        for (var i = 0; i < arguments.length - 3; i++) {
            iterable[i + start] = arguments[i + 3]
        }

        // Return the removed items
        return removed
    }
}

console.log('TEST splice')

console.log('CASE extract elements from index 3')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, 3)
console.log(nums)
// {0: 100, 1: 200, 2: 300, length: 3}
console.log(extracted)
// {0: 400, 1: 500, 2: 600, 3: 700, length: 4}

console.log('CASE extract 2 elements from index 1')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, 1, 2)
console.log(nums)
// { 0: 100, 1: 200, 2: 500, 3: 600, 4: 700, length: 5 }
console.log(extracted)
// { 0: 300, 1: 400, length: 2 }

console.log('CASE extract 3 elements from index 1 and add 3 elements')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, 1, 4, 800, 900, 1000)

console.log(nums)
// {0: 100, 1: 800, 2: 900, 3: 1000, 4: 600, 5: 700, length: 6}
console.log(extracted)
// {0: 200, 1: 300, 2: 400, 3: 500, length: 4}

console.log('CASE extract 1 element from index -7 and add 2 elements')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(nums, -7, 1, 800, 900)

console.log(nums)
// {0: 800, 1: 900, 2: 200, 3: 300, 4: 400, 5: 500, 6: 600, 7: 700, length: 8}
console.log(extracted)
// {0: 100, length: 1}
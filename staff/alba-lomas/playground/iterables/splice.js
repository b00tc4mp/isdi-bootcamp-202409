


var splice = function (iterable, start) {
    if (arguments.length === 2) {
        // iterable -> { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
        // start -> 3

        // removed -> { length: 0}

        // removed -> { 0: 400, length: 0 }
        // removed -> { 0: 400, length: 1 }
        // iterable -> { 0: 100, 1: 200, 2: 300, 4: 500, 5: 600, 6: 700, length: 7 }
        // iterable -> { 0: 100, 1: 200, 2: 300, 4: 500, 5: 600, 6: 700, length: 6 }

        // removed -> { 0: 400, 1: 500, length: 1 }
        // removed -> { 0: 400, 1: 500, length: 2 }
        // iterable -> { 0: 100, 1: 200, 2: 300, 5: 600, 6: 700, length: 6 }
        // iterable -> { 0: 100, 1: 200, 2: 300, 5: 600, 6: 700, length: 5 }

        // removed -> { 0: 400, 1: 500, 2: 600 length: 2 }
        // removed -> { 0: 400, 1: 500, 2: 600 length: 3 }
        // iterable -> { 0: 100, 1: 200, 2: 300, 6: 700, length: 5 }
        // iterable -> { 0: 100, 1: 200, 2: 300, 6: 700, length: 4 }

        // removed -> { 0: 400, 1: 500, 2: 600, 6: 700, length: 3 }
        // removed -> { 0: 400, 1: 500, 2: 600, 6: 700, length: 4 }
        // iterable -> { 0: 100, 1: 200, 2: 300, length: 4 }
        // iterable -> { 0: 100, 1: 200, 2: 300, length: 3 }

        // return removed

        var removed = { length: 0 }

        for (var i = start; i < iterable.length; i++) {
            var element = iterable[i]

            delete iterable[i]

            removed[removed.length] = element
            removed.length++
        }

        // iterable.length = iterable.length - removed.length
        iterable.length -= removed.length

        return removed
    } else if (arguments.length === 3) {

    }
}




console.log('TEST splice')

console.log('CASE extract elements from index 3')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }


var extracted = nums.splice(3)

console.log(nums)
// { 0: 100, 1: 200, 2: 300, length: 3 }
console.log(extracted)
// { 0: 400, 1: 500, 2: 600, 3: 700 }
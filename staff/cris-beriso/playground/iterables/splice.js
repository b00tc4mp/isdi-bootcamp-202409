var splice = function (iterable, start, deleteCount) {
    if (arguments.length === 2) {
        var removed = { length: 0 }

        for (var i = start; i < iterable.length; i++) {
            var element = iterable[i];

            delete iterable[i];

            removed[removed.length] = element;
            removed.length++;
        }
        //no es posible modificar la longitud del iterable sobre la marcha porque lo estamos tomando como referencia.
        iterable.length -= removed.length;
        return removed;
    } else if (arguments.length === 3) {
        /*
        iterable -> { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
        start -> 1
        deletCount -> 2
        */
        var removed = { length: 0 }

        for (var i = start; i < start + deleteCount; i++) {
            var element = iterable[i];

            removed[removed.length] = element;
            removed.length++;
        }
        //no es posible modificar la longitud del iterable sobre la marcha porque lo estamos tomando como referencia.

        // iterable -> { 0: 100, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
        // iterable -> { 0: 100, 1: 400, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
        // iterable -> { 0: 100, 1: 400, 2: 500, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
        // iterable -> { 0: 100, 1: 400, 2: 500, 3: 600, 4: 500, 5: 600, 6: 700, length: 7 }
        // iterable -> { 0: 100, 1: 400, 2: 500, 3: 600, 4: 700, 5: 600, 6: 700, length: 7 }

        for (var i = start + deleteCount; i < iterable.lenth; i++) {
            var element = iterable[i]

            iterable[i - deleteCount] = element
        }

        // iterable -> { 0: 100, 1: 400, 2: 500, 3: 600, 4: 700, 6: 700, length: 7 }
        // iterable -> { 0: 100, 1: 400, 2: 500, 3: 600, 4: 700, length: 7 }

        for (var i = iterable.length - deleteCount; i < iterable.length; i++) {
            delete iterable[i]
        }
        iterable.length -= deleteCount

        return removed;
    }

}
console.log('TEST splice')

console.log('CASE extract elements from index 3')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 };
var extracted = splice(nums, 3);
console.log(nums);
// {0: 100, 1: 200, 2: 300, length: 3}
console.log(extracted);
// { 0: 400, 1: 500, 2: 600, 3: 700, length: 4}

console.log('CASE extract elements from index 1 and delete 2')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 };
var extracted = splice(nums, 1, 2);

console.log(nums);
// {0: 100, 1: 400, 2: 500, 3: 600, 4: 700, length: 5}
console.log(extracted);
// { 0: 200, 1: 300, length: 2}
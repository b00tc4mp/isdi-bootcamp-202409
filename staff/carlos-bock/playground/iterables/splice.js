var splice = function (iterable, start,deleteCount) {
    if (arguments.length ===2) {
        var removed = {length: 0};

        for (var i = start; i < iterable.length; i++){
            var element = iterable [i];

            delete iterable[i];

            removed[removed.length] = element;
            removed.length++;
        }

        iterable.length -= removed.length;
        
        return removed;
    } else if (arguments.length === 3){
        var removed = {length: 0};
        
        for (var i = start; i < start + deleteCount; i++) {
            var element = iterable[i];
            delete iterable [i];

            removed[removed.length] = element;
            removed.length++;
        }

        for (var i = start + deleteCount; i < iterable.length; i++) {
            var element = iterable[i];
            iterable[i - deleteCount] = element;
        }

        for (var i = iterable.length - deleteCount; i < iterable.length; i++) {
            delete iterable[i];
        }
        iterable.length -= deleteCount;
        return removed;
    }
}

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }

console.log('TEST splice')
console.log(nums)
// { 0: 100, 1: 200, 2: 300, length: 3 }
console.log(extracted)
// { 0: 400, 1: 500, 2: 600, 3: 700, length: 4 }
console.log('CASE extract elements from index 2 and delete 2')
var extracted = splice(nums, 1, 2)
console.log(nums)
// { 0: 100, 1: 400, 2: 500, 3: 600, 4: 700, length: 5 }
console.log(extracted)
// { 0: 200, 1: 300, length: 2 }
var splice = function (iterable, start) {
    var removed = { length: 0 }

    for (var i = start; i < iterable.length; i++) {
        var element = iterable[i];
        delete iterable[i];
        removed[removed.length] = element;
        removed.length++;
    }

    iterable.length -= removed.length;
    return removed;

}

console.log('TEST Array.prototype.splice');

console.log('CASE 1: Extract elements from index 2.');

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 };

var extracted = splice(nums, 3);
console.log(nums);
//[ 100, 200, 300 ]
console.log(extracted);
//[ 400, 500, 600, 700 ]
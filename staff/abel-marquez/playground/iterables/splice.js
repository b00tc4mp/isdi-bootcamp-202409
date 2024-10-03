var splice = function (iterable,start) {

    var removed = {length : 0}
    for (var i = start; i < iterable.length;i++) {
        var element = iterable[i]
        delete iterable[i]
        removed[removed.length] = element
        removed.length++
    }

    iterable.length -= removed.length
    return removed
}






console.log('TEST splice')

console.log('CASE extract elements from index 3')

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7}

var extracted = splice(nums,3)

console.log(nums)
// {0: 100, 1: 200, 2: 300, length: 3}
console.log(extracted)
// {0: 400, 1: 500, 2: 600, 3: 700, length: 4}
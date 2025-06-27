
console.log("TEST Callback Join ")

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };

var find = function (iterable, callback) {
    for (i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element) === true) {
            return element
        }
    }
    return undefined
}

var biggerthan = function (element) {
    return element > 10
}

var found = find(nums, biggerthan)

console.log(found);
// Expected output: 12

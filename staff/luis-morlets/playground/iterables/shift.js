var shift = function (iterable) {
    /*
    iterable CASE1 -> { 0: 100, 1: 200, 2: 300, length: 3};
    iterable CASE2 -> { 0: 'jose', 1: 'juan', 2: 'manuel', 3: 'miguel', length: 4 };

    extract first element on iterable
    iterable CASE1 -> { 1: 200, 2: 300, length: 3};
    iterable CASE2 -> { 1: 'juan', 2: 'manuel', 3: 'miguel', length: 4 };

    adjust iterable length
    iterable CASE1 -> { 0: 200, 1: 300, length: 2};
    iterable CASE2 -> { 0: 'juan', 1: 'manuel', 2: 'miguel', length: 3 };

    return element for each case
    */
    var element = iterable[0]
    delete iterable[0]

    for (var i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
    iterable.length--
    delete iterable[iterable.length]
    return element
}


console.log('TEST shift')

console.log('CASE extract first element in nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 };

var firstElement = shift(nums);

console.log(nums);
// Expected output: { 0: 200, 1: 300, length: 2 }

console.log(firstElement);
// Expected output: 100


console.log('CASE extract first element in names')

var names = { 0: 'jose', 1: 'juan', 2: 'manuel', 3: 'miguel', length: 4 };

var firstElement = shift(names);

console.log(names);
// Expected output: { 0: 'juan', 1: 'manuel', 2:'miguel', length: 3 }

console.log(firstElement);
// Expected output: jose
var at = function (iterable, index){
    //case positive
    //case negative
    if (index >= 0){
        var element = iterable[index];
    } else {
        var newIndex = index + interable.length;

        var element = iterable[newIndex];
    }

    

    return element;
}

console.log('test at');

console.log('case get a number at index 3 in nums');

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}

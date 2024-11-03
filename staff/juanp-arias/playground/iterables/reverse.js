
var reverse = function (iterable) {

    var result = { length: 0 };

    for (var i = iterable.length; i > -1; i--) {

        result[result.length] = iterable[i - 1];

        result.length++;
    }

    iterable = result;
    return result;
}

var colors = { 0: 'blue', 1: 'yellow', 2: 'green', 3: 'pink', length: 4 };
console.log(reverse(colors))
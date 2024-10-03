var colors = { 0: 'blue', 1: 'yellow', 2: 'green', 3: 'pink', length: 4 };

var reverse = function (iterable) {

    var result = { length: 0 };

    for (var i = iterable.length; i >= 0; i--) {

        result[result.length] = iterable[i - 1];

        result.length++;
    }

    colors = result;
    return colors;
}

console.log(reverse(colors))
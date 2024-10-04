var reverse = function (iterable) {
    var copyIterable = [];

    for (var i = 0; i < iterable.length; i++) {
        copyIterable.push(iterable[i])
    }


    for (var i = 0; i < iterable.length; i++) {
        iterable[i] = copyIterable[iterable.length - 1 - i];
    }
    return iterable;
}


console.log('CASE reverse array ')

const animals = { 0: "panda", 1: "elefante", 2: "mono", 3: "jirafa", 4: "leon", length: 5 }
const reverse = reverse(animals)
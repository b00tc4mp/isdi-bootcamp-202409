

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water


var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 };


// devuelve string a secas
var join = function (iterable) {
    var outcome = "";
    for (var i = 0; i < iterable.length; i++) {
        outcome = outcome + iterable[i];
    }
    return outcome
}

// Agregamos condicion de separador

var join = function (iterable, separator) {
    var outcome = "";
    if (!separator) {
        for (var i = 0; i < iterable.length; i++) {
            if (i === 0)
                outcome = outcome + iterable[i];
            else
                outcome = outcome + "," + iterable[i];
        }
        return outcome
    }
    else {
        var outcome = "";
        for (var i = 0; i < iterable.length; i++) {
            if (i === 0)
                outcome = outcome + iterable[i];
            else
                outcome = outcome + separator + iterable[i];
        }
        return outcome
    }
}





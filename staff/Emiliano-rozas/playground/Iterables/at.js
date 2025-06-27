console.log("CASE locate 30")

var numbers = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, length: 5 }
var number = at(numbers, 3)
console.log(number)
//30


var at = function (iterable, index) {
    //buscar en el iterable el elemento que se encuentra en el index
    if (index > -1) {
        return iterable[index]
    }
    else {
        return iterable[iterable.length + index]
    }
}

//mio
var at = function (iterable, index) {
    if (index < 0) {
        index = index + iterable.length;
        return iterable[index]
    }
    else {
        return iterable[index]
    }
}


//buscar en el iterable el elemento que se encuentra en el index

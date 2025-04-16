console.log('TEST concat')
//crea un nuevo array juntando todos los arrays que le presentes.

var concat = function () {
    var result = { length: 0 }

    for (var j = 0; j < arguments.length; j++) {
        var iterableX = arguments[j]

        for (var i = 0; i < iterableX.length; i++) {
            var element = iterableX[i]

            result[result.length] = element
            result.length++
        }
    }

    return result
}


var colors1 = { 0: 'green', 1: 'red', 2: 'pink'}

var colors2 = {
    0: 'orange', 1: 'yellow', 2: 'black', 3: 'white'
}

var newArray = concat(colors1, colors2)
console.log(newArray)
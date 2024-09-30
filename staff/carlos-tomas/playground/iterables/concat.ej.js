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

console.log("array.prototyoe.concat.ej")

console.log("CASE  concat characters")

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var abcdefghi = concat(abc, def, ghi)

console.log(abcdefghi)
// abcdef = {0:'a',1:'b',2:'c',3:'d',4:'e', 5:'f',6:"g",7:"h",8:"i" length 9}



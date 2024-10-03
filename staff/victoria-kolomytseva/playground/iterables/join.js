var join = function (iterables, separador) {
    var result = ''



    if (separador === undefined) {
        separador = ','
    }


    for (var i = 0; i < iterables.length; i++) {
        var element = iterables[i]
        if (i === 0) {
            result += element
        }
        else {
            result += separador + element
        }

    } return result

}







console.log('CASE join elements')

var names = { 0: "Anna", 1: "Elena", 2: "Sofia", 3: "Andrea", 4: "Monica", length: 5 }

var names2 = join(names)
console.log(names2)
// "Anna,Elena,Sofia,Andrea,Monica"

console.log('Case  with ' - '')

var names = { 0: "Anna", 1: "Elena", 2: "Sofia", 3: "Andrea", 4: "Monica", length: 5 }

var names2 = join(names, '-')
console.log(names2)
// "Anna-Elena-Sofia-Andrea-Monica"
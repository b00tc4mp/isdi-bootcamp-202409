var ns = [100, 200, 300]

/*
for (var i = 0; i < ns.length; i++)
    console.log(ns[i])
*/

//ns.forEach(function(n) { console.log(n) })

var forEach = function (array, index) {
    if (index === undefined) index = 0

    console.log(array[index])

    if (index < array.length - 1)
        forEach(array, index + 1)
}

forEach(ns)
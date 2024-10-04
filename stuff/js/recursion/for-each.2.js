var ns = [100, 200, 300]
var cs = ['a', 'b', 'c']

/*
for (var i = 0; i < ns.length; i++)
    console.log(ns[i])
*/

//ns.forEach(function(n) { console.log(n) })

var forEach = function (array, callback, index) {
    if (index === undefined) index = 0

    callback(index)

    if (index < array.length - 1)
        forEach(array, callback, index + 1)
}

forEach(ns, function (i) { console.log(ns[i]) })
forEach(cs, function (i) { console.log(cs[i]) })

var r = 0
forEach(ns, function (i) { r += ns[i] })
console.log(r)
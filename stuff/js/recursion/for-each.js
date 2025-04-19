var ns = [100, 200, 300]
var cs = ['a', 'b', 'c']

/*
for (var i = 0; i < ns.length; i++)
    console.log(ns[i])
*/

//ns.forEach(function(n) { console.log(n) })

var forEach = function (array, callback, index) {
    if (index === undefined) index = 0

    callback(index, array)

    if (index < array.length - 1)
        forEach(array, callback, index + 1)
}

forEach(ns, function (i, a) { console.log(a[i]) })
// 100
// 200
// 300

forEach(cs, function (i, a) { console.log(a[i]) })
// a
// b
// c

var r = 0
forEach(ns, function (i, a) { r += a[i] })
console.log(r)
// 600
var map = function (iterable, callback) {
    var nums2 = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        nums2[nums2.length] = callback(element, i, iterable)
        nums2.length++
    }
    return nums2
}
console.log("CASE map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos")

var nums = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

var res = map(nums, function (element) {
    return element * 2
})


console.log(res)
//nums2 {0: 2, 1: 8, 2: 18, 3: 36, length: 4}
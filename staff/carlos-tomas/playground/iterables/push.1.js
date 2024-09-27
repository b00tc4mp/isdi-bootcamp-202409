var push = function (iterable, element) {

    if (arguments === 2) {
        iterable[iterable.length] = element
        iterable.length++

    } else
        for (var i = 1; i < arguments.length; i++) {

            var element = arguments[i]

            iterable[iterable.length] = element
            iterable.length++

        }


}



console.log("TEST psuh")

console.log("CASE add 400 or more  arguments")

var nums = { 0: 100, 1: 200, length: 2 }

var num = push(nums, 300, 400, 500)



console.log(nums)
//{0: 100, 1: 200, 2: 300, 3:400, 5:500  length:2}

console.log(length)
//length: 5
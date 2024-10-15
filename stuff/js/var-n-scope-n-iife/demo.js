console.log(new Date)

var nums = [100, 200, 300, 400, 500]

console.log(new Date, 'for starts')

for (var i = 0; i < nums.length; i++) {
    var num = nums[i];

    //setTimeout(function() { console.log(new Date, num) }, 1000 * (1 + i))

    (function (n) {
        setTimeout(function () { console.log(new Date, n) }, 1000 * (1 + i))
    })(num)

}

console.log(new Date, 'for ended', num)
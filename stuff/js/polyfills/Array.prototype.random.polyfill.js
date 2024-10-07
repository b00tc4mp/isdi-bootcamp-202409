// let's imagine all navigators have random method, but mine

// then use this polyfill
if (Array.prototype.random === undefined)
    Array.prototype.random = function () {
        var index = Math.floor(Math.random() * this.length)

        return this[index]
    }

var a = [10, 20, 30]
var element = a.random()
console.log(element)
// 30
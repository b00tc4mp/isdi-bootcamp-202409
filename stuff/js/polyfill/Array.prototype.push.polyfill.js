// let's imagine navigator does not have push
delete Array.prototype.push

// so let's inject a polyfill solution

if (Array.prototype.push === undefined)
    Array.prototype.push = function () {
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i]

            this[this.length] = element
        }

        return this.length
    }

// then run my code safely

var a = [10, 20, 30]
a.push(40)
console.log(a)
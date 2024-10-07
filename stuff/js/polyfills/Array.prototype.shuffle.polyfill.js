// let's imagine all navigators have shuffle method, but mine

// then use this polyfill
if (Array.prototype.shuffle === undefined)
    Array.prototype.shuffle = function () {
        /*
        this -> [10, 20, 30, 40, 50]
        
        var i, randomIndex, randomElement

        i -> 0
        randomIndex -> 3
        randomElement -> 40 (this[3])
        this[3] -> 10 (this[0])
        this[0] -> 40 (randomElement)
        this -> [40, 20, 30, 10, 50]

        i = 1
        randomIndex -> 3
        randomElement -> 10 (this[3])
        this[3] -> 20 (this[1])
        this[1] -> 10 (randomElement)
        this -> [40, 10, 30, 20, 50]

        i = 2
        randomIndex -> 2
        this -> [40, 10, 30, 20, 50]

        i = 3
        randomIndex -> 4
        randomElement -> 50 (this[4])
        this[4] -> 20 (this[3])
        this[3] -> 50 (randomElement)
        this -> [40, 10, 30, 50, 20]
        */

        for (var i = 0; i < this.length - 1; i++) {
            var randomIndex = i + Math.floor(Math.random() * (this.length - i))

            var randomElement = this[randomIndex]
            this[randomIndex] = this[i]
            this[i] = randomElement
        }
    }

var a = [10, 20, 30, 40, 50]
a.shuffle()
console.log(a)
// [40, 10, 30, 50, 20]
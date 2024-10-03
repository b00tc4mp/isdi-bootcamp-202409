var Raid = function () {
    this.length = 0
}

Raid.prototype.fill = function (element, start, end) {
    if (start < 0 || end < 0) {
        start += this.length
        end += this.length
    }
    if (!start && !end) {
        for (var i = 0; i < this.length; i++) {
            this[i] = element
        }
    } else if (!end) {
        for (var i = start; i < this.length; i++) {
            this[i] = element
        }
    } else {
        for (var i = start; i < end; i++) {
            this[i] = element
        }
    }

    return this
}

var raid = new Raid
raid[0] = 'a'
raid[1] = 'b'
raid[2] = 'c'
raid[3] = 'd'
raid.length = 4

var fillRaid = raid.fill('x')
console.log(fillRaid)
// {0: 'x', 1: 'x', 2: 'x', 3:'x', length: 4}

var raid = new Raid
raid[0] = 'a'
raid[1] = 'b'
raid[2] = 'c'
raid[3] = 'd'
raid.length = 4

var fillRaid = raid.fill('x', 2)
console.log(fillRaid)
// {0: 'a', 1: 'b', 2: 'x', 3:'x', length: 4}

var raid = new Raid
raid[0] = 'a'
raid[1] = 'b'
raid[2] = 'c'
raid[3] = 'd'
raid.length = 4

var fillRaid = raid.fill('x', 1, 3)
console.log(fillRaid)
// {0: 'a', 1: 'x', 2: 'x', 3:'d', length: 4}

var raid = new Raid
raid[0] = 'a'
raid[1] = 'b'
raid[2] = 'c'
raid[3] = 'd'
raid[4] = 'e'
raid[5] = 'f'
raid.length = 6

var fillRaid = raid.fill('x', -3, -1)
console.log(fillRaid)
// {0: 'a', 1: 'b', 2: 'c', 3:'x', 4: 'x', 5: 'f', length: 6}
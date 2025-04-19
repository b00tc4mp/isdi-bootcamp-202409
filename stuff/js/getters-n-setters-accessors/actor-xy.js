var actor = {
    x: 0,
    y: 0,

    set coords(value) { // [10, 20]
        if (!(value instanceof Array)) throw new Error('invalid value')

        this.x = value[0]
        this.y = value[1]
    },

    get coords() {
        return [this.x, this.y]
    }
}

actor.coords = [30, 40]
// (2)[30, 40]
actor
// { x: 30, y: 40 }
actor.coords
// (2)[30, 40]
actor.coords = 200
// VM546: 6 Uncaught Error: invalid value
//     at set coords(<anonymous>:6:46)
//     at <anonymous>:1:14
//         set coords @ VM546:6
//         (anonymous) @ VM570:1
var o = {
    _name_: null,

    get name() {
        return this._name_
    },

    set name(name) {
        this._name_ = name.toUpperCase()
    }
}

o
// { _name_: null } name: (...)_name_: nullget name: ƒ name()set name: ƒ name(name)[[Prototype]]: Object
o.name
// null
o.name = 'peter'
// 'peter'
o
// { _name_: 'PETER' }
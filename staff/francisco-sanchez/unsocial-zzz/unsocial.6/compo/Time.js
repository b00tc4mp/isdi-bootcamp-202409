//Función constructora de Time
function Time(text) {
    Compo.call(this, document.createElement('time'))

    this.container.innerText = text
}

Time.extends(Compo)

//Time.prototype = Object.create(Compo.prototype)
//Time.prototype.constructor = Time

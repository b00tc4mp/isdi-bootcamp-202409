
/* 
class Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button */

class Button extends Compo {
    constructor (text, type){
        super(document.createElement('button'))

        this.container.innerText = text
        this.container.type = type
    }
}



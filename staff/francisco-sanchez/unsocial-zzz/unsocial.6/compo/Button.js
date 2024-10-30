/**
 * Constructs Button instances
 * 
 * @param {string} text The text of the button
 * @param {string} type The button type
 */
function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}
//Hereda los método y propiedades de Compo 
Button.extends(Compo)

/*Button.prototype = Object.create(Compo.prototype)
//En esta segunda instrucción le decimos que el constructor de button es Button, y no Compo, 
//como habría pasado si no lo hubiesemos modificado manualmente. Esto es a causa de la herencia 
Button.prototype.constructor = Button*/

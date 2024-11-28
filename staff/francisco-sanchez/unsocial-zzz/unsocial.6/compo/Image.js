/**
 * 
 */

//Función de la imagen de posts

function Image(address) {
    Compo.call(this, document.createElement('img'))

    this.container.src = address
    this.container.style.width = '95%'
}

Image.extends(Compo)
//Image.prototype = Object.create(Compo.prototype)
//Image.prototype.constructor = Image
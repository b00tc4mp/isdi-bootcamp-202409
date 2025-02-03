class Image extends Compo {
    constructor(address) {
        // Llama al constructor de Compo con un elemento <img> como contenedor
        super(document.createElement('img'))
        // Asigna la dirección (src) de la imagen
        this.container.src = address
        // Establece el ancho de la imagen al 95%
        this.container.style.width = '95%'
    }
}


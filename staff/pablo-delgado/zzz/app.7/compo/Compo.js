/**
 * Constructs Compo instances
 * 
 * @param {HTMLElement} container The DOM container of the Compo instance
 */
class Compo { //creamos contenedor y le añadimos hijos
    constructor(container) {
        this.children = []
        this.container = container
        this.parent = null
    }


    add(child) { //metemos child en array de children, al container
        this.children.push(child)
        child.parent = this

        this.container.appendChild(child.container)
    }

    removeSelf() { //aquí Compo busca en array children y si se encuentra se self-elimina, she gone!
        const index = this.parent.children.findIndex(child => child === this)

        if (index > -1) {
            this.parent.children.splice(index, 1)

            this.container.remove()
        }
    }
    addBehavior(type, callback) {
        this.container.addEventListener(type, callback)
    }
}

/**
 *  Has olvidado tu contraseña?
 */

// const forgotPasswordText = new Paragraph('¿Has olvidado la contraseña? ');
// form.add(forgotPasswordText);

// const forgotPasswordLink = new Link('Haz clic aquí');
// forgotPasswordLink.container.style.textDecoration = 'underline'; // Subrayar el enlace
// forgotPasswordLink.container.href = 'http://www.usethefuckinggoogle.com/'
// forgotPasswordLink.addBehavior('click', function (event) {
//     event.preventDefault();
//     // Aquí puedes agregar la lógica para recuperar la contraseña
//     alert("Funcionalidad de recuperación de contraseña no implementada.");
// });
// form.add(forgotPasswordLink);
/**
 * Constructs Form instances
 */
class Form extends Compo {
    constructor() {
        // Llamamos al constructor de Compo con un elemento <form>
        super(document.createElement('form'));
    }

    // Método para resetear el formulario
    reset() {
        this.container.reset()
    }
}
/**
 * Constructs Form instances
 */
function Form(){
    Compo.call(this, document.createElement('form'))
}

Form.extends(Compo)

Form.prototype.reset = function(){
    this.container.reset()
}
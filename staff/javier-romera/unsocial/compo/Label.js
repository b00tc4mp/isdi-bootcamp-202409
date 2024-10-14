/**
 * Constructs Label instances
 * 
 * @param {string} text The text of the label
 * @param {string} id The id of the input to relate with
 */
function Label(text, id) {
    Compo.call(this, document.createElement('label'))
    this.container.innerText = text
    this.container.htmlFor = id
}

Label.extends(Compo)
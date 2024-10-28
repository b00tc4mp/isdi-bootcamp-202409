/**
 * Function 
 * @param {string} text 
 * @param {number} level 
 */
class Heading extends Compo {
    constructor(text, level) {
        super(document.createElement('h' + level))
        this.container.innerText = text
    }
}


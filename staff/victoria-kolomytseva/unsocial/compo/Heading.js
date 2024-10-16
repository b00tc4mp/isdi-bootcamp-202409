/**
 * Constructs Heading instances
 * 
 * @param {string} text The text of the heading
 * @param {number} level The heading level
 */
class Heading extends Compo {
    constructor(text, level) {
        super(document.createElement(`h${level}`))

        console.log(this.container)
        this.container.innerText = text
    }

}
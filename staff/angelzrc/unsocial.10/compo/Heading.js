/**
 * Constructs Heading instances
 */
function Heading(text, level) {
    Compo.call(this, document.createElement('h' + level))

    this.container.innerText = text
}

Heading.extends(Compo)
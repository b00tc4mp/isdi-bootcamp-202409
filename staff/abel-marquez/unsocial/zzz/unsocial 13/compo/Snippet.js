/**
 * 
 * @param {*} text 
 */

class Snippet extends Compo {
    constructor(title, text) {
    super(document.createElement('div'))

    const title = new Heading(title, 4)

    const pre = new Preformatted('')
    const code = new Code(text)
    pre.add(code)

    this.add(pre)
}}
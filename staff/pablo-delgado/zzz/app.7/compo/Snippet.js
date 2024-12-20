class Snippet extends Compo {
    constructor(title, text) {
        super(document.createElement('div'))

        const heading = new Heading(title, 4)
        this.add(heading)

        const pre = new Preformatted('')
        const code = new Code(text)
        pre.add(code)

        this.add(pre)
    }
}

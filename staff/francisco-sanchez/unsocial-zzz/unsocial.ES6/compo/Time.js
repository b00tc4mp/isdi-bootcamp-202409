class Time extends Compo {
    constructor(text) {
        super(document.createElement('time'))
        this.container.innerText = text
    }
}
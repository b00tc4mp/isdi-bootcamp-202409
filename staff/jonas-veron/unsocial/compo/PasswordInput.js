/**
 * 
 * @param {string} id The input id
 * 
 */
class PasswordInput extends Compo{
    constructor(id) {
        super(document.createElement('div'))

        const input = new Input('password', id)
        this.add(input)

        const span = new Span('😊')
        span.container.style.cursor = 'pointer'
        this.add(span)

        span.addBehavior('click',() => {
        if(span.getText() === '😊') {
            input.setType('text')
            span.setText('😃')
        } else{
            input.setType('password')
            span.setText('😊')
        }
    })
}

    getValue() {
        return this.children[0].container.value
    }

    setValue(value) {
        this.container.value = value
    }
}
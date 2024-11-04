/*
 * Constructs PasswordInput instances
 * 
 * @param {string} id The input id
 */
class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'))
        this.container.style.display = 'flex'

        this.container.style.display = 'flex'
        this.container.style.position = 'relative'

        const input = new Input('password', id)
        input.container.style.paddingRight = '40px'
        this.add(input)

        const span = new Span('😌')
        span.container.style.cursor = 'pointer'
        span.container.style.position = 'absolute'
        span.container.style.right = '3px'
        span.container.style.top = '30%'
        span.container.style.transform = 'translateY(-50%)'
        this.add(span)
        

        span.addBehavior('click', () => {
            if (span.getText() === '😌') {
                input.setType('text')
                span.setText('😳')
            } else {
                input.setType('password')
                span.setText('😌')
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
class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'))
        this.container.style.display = 'flex'

        let input = new Input('password', id)
        input.container.style.paddingRight = '18px'
        this.add(input)

        let span = new Span('🫣')
        span.container.style.cursor = 'pointer'
        span.container.style.position = 'absolute'
        span.container.style.right = '10px'
        this.add(span)

        span.addBehavior('click', function () {
            if (span.getText() === '🫣') {
                input.setType('text')
                span.setText('🥳')
            } else {
                input.setType('password')
                span.setText('🫣')
            }
        })
    }

    getValue() {
        return this.children[0].container.value
    }

    setValue(value) {
        this.container.value = value
    }

    reset() {
        this.container.value = ''
    }
}
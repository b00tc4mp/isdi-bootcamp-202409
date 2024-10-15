class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'))
        this.container.style.display = 'flex'
        this.container.style.flexDirection = 'row'
        this.container.style.alignItems = 'center'

        const input = new Input('password', id)
        this.add(input)

        const span = new Span('🔒')
        span.container.style.cursor = 'pointer'
        span.container.style.fontSize = '150%'
        span.container.style.position = 'relative'
        span.container.style.right = '-2px'
        span.container.style.marginBottom = '17px'
        this.add(span)

        span.addBehaviour('click', function () {
            if (span.getText() === '🔒') {
                input.setType('text')
                span.setText('🔓')
            } else {
                input.setType('password')
                span.setText('🔒')
            }
        })
    }

    getValue() {
        return this.children[0].container.value
    }

    setValue = function (value) {
        this.container.value = value
    }
}
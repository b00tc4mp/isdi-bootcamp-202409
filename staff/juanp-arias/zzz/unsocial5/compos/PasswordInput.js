
class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'))

        var input = new Input('password', id)
        this.add(input)

        var span = new Span('😊')
        span.container.style.cursor = 'pointer'
        this.add(span)

        span.addBehavior('click', function () {
            if (span.getText() === '😊') {
                input.container.type = 'text'
                span.setText('🫥')
            } else {
                input.container.type = 'password'
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

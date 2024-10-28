function PasswordInput(id) {
    Compo.call(this, document.createElement('div'))
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'row'
    this.container.style.alignItems = 'center'

    var input = new Input('password', id)
    this.add(input)

    var span = new Span('🔒')
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

PasswordInput.extends(Compo)

PasswordInput.prototype.getValue = function () {
    return this.children[0].container.value
}


PasswordInput.prototype.setValue = function (value) {
    this.container.value = value
}
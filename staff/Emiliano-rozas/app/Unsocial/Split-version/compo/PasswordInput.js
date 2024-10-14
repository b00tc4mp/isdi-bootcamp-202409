/**
 * 
 * @param {string} id 
 */

function PasswordInput(id) {
    Compo.call(this, document.createElement('div'))

    var input = new Input('password', id)
    this.add(input)

    var span = new Span('😌')
    span.container.style.cursor = 'pointer'
    this.add(span)

    span.addBehavior('click', function () {
        if (span.getText() === '😌') {
            input.setType('text')
            span.setText('😳')
        } else {
            input.setType('password')
            span.setText('😌')
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


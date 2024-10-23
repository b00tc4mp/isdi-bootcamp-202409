function PasswordInput(id) {
    Compo.call(this, document.createElement('div'))

this.container.style.display = 'flex'

var input = new Input('password', id)
input.container.style.paddingRight = '18px'
this.add(input)


var span = new Span('😌')
this.add(span)

span.addBehavior('click', function() {
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
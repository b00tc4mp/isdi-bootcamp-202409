/**
 * Construct PasswordInput instances
 * 
 * @param {string} id The input id
 */
function PasswordInput(id) {
    Compo.call(this, document.createElement('div'))
    this.container.style.display = 'flex'

    var input = new Input('password', id)
    input.container.style.paddingRight = '30px'
    this.add(input)

    var icon = new Icon('https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png')
    icon.container.style.cursor = 'pointer'
    icon.container.style.position = 'absolute'
    icon.container.style.width = '20px'
    icon.container.style.right = '55px'
    this.add(icon)

    icon.addBehavior('click', function () {
        if (icon.getAddress() === 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png') {
            input.setType('text')
            icon.setAddress('https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png')
        } else {
            input.setType('password')
            icon.setAddress('https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png')
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
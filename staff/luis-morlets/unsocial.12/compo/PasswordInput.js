/**
 * Construct PasswordInput instances
 * 
 * @param {string} id The input id
 */
class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'))
        this.container.style.display = 'flex'

        const input = new Input('password', id)
        input.container.style.paddingRight = '30px'
        this.add(input)

        const icon = new Icon('https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png')
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

    getValue() {
        return this.children[0].container.value
    }

    setValue(value) {
        this.container.value = value
    }
}
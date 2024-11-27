/**
 * 
 * @param {string} id 
 */

class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'))

        this.container.style.display = "flex"
        this.container.style.position = "relative"

        const input = new Input('password', id)
        this.add(input)

        var icon = new Span('😌')
        icon.container.style.cursor = 'pointer'
        icon.container.style.position = "absolute"
        icon.container.style.right = "3px"
        icon.container.style.top = "30%"
        icon.container.style.transform = "translateY(-50%)"

        this.add(icon)

        icon.addBehavior('click', function () {
            if (icon.getText() === '😌') {
                input.setType('text')
                icon.setText('😳')
            } else {
                input.setType('password')
                icon.setText('😌')
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

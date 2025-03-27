class Passwordinput extends Compo {
  constructor(className, id, type, placeholder, required) {
    super(document.createElement('div'))
    this.container.classList.add(className)

    const input = new Input(id, type, placeholder, required)
    this.add(input)

    const icon = new Icon()
    this.add(icon)

    let isVisible = false
    icon.addBehavior('click', function (event) {
      icon.container.classList.toggle('fa-eye-slash')
      if (!isVisible) {
        input.setType('text')
        isVisible = true
      } else {
        input.setType('password')
        isVisible = false
      }
    })
  }

  getValue() {
    return this.children[0].container.value
  }
  setValue(value) {
    this.children[0].container.value = value
  }
}
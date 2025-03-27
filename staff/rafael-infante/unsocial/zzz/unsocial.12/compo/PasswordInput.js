function Passwordinput(className, id, type, placeholder, required) {
  Compo.call(this, document.createElement('div'))
  this.container.classList.add(className)

  var input = new Input(id, type, placeholder, required)
  this.add(input)

  var icon = new Icon()
  this.add(icon)

  var isVisible = false
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
Passwordinput.extends(Compo)

Passwordinput.prototype.getValue = function () {
  return this.children[0].container.value
}
Passwordinput.prototype.setValue = function (value) {
  this.children[0].container.value = value
}
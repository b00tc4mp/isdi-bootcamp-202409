/**
 * Constructs PasswordInput instances
 * 
 * @param {string} id The input id
 */
class PasswordInput extends Compo {
  constructor(id) {
    super(document.createElement('div'))
    this.container.style.display = 'flex'

    const input = new Input('password', id)
    this.add(input)

    let span = new Span('🙈')
    span.container.style.cursor = 'pointer'
    span.container.style.position = 'relative'
    span.container.style.right = '20px'
    this.add(span)

    span.addBehavior('click', function () {
      if (span.getText() === '🙈') {
        input.setType('text')
        span.setText('🐵')
      } else {
        input.setType('password')
        span.setText('🙈')
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
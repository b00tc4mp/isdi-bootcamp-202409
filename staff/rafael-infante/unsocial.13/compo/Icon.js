class Icon extends Compo {
  constructor() {
    super(document.createElement('i'))
    this.container.classList.add('far')
    this.container.classList.add('fa-eye')
    this.container.id = 'icon'
  }
}
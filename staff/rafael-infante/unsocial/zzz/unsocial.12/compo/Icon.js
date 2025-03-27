function Icon() {
  Compo.call(this, document.createElement('i'))
  this.container.classList.add('far')
  this.container.classList.add('fa-eye')
  this.container.id = 'icon'
}
Icon.extends(Compo)
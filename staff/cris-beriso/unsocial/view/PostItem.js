function PostItem(username, image, text, date) {
  Compo.call(this, document.createElement('div'))

  var userTitle = new Heading(username, 5)
  this.add(userTitle)

  var picture = new Image(image)
  this.add(picture)

  var comment = new Paragraph(text)
  this.add(comment)

  var time = new Time(date)
  this.add(time)
}

PostItem.extends(Compo)
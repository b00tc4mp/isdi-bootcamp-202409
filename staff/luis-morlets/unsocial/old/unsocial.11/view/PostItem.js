function PostItem(username, image, text, date) {
    Compo.call(this, document.createElement('div'))

    var self = this

    var userTitle = new Heading(username, 4)
    self.add(userTitle)

    var picture = new Image(image)
    self.add(picture)

    var comment = new Paragraph(text)
    self.add(comment)

    var time = new Time(date)
    self.add(time)
}

PostItem.extends(Compo)
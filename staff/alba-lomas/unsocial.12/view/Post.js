


function Post(username, image, text, date) {
    Compo.call(this, document.createElement('div'))

    var userTitle = new Heading(username, 4)
    this.add(userTitle)

    var picture = new Image(image)
    this.add(picture)

    var comment = new Paragraph(text)
    this.add(comment)

    var time = new Time(date)
    this.add(time)
}

Post.extends(Compo)
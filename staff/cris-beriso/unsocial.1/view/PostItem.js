class PostItem extends Compo {
  constructor(username, image, text, date) {
    super(document.createElement('div'))

    const userTitle = new Heading(username, 5)
    this.add(userTitle)

    const picture = new Image(image)
    this.add(picture)

    const comment = new Paragraph(text)
    this.add(comment)

    const time = new Time(date)
    this.add(time)
  }
}
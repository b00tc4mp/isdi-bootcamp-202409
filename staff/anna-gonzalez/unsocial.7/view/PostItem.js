function PostItem(username, image, text, date, emoji) {
    Compo.call(this, document.createElement('article'))
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'column'
    this.container.style.justifyContent = 'center'
    this.container.style.textAlign = 'center'
    this.container.style.alignItems = 'center'

    var userTitle = new Heading(username, 4)
    userTitle.container.style.textDecoration = 'underline'
    userTitle.container.style.color = 'yellow'
    userTitle.container.style.marginTop = '100px'
    this.add(userTitle)

    var picture = new Image(image)
    this.add(picture)

    var comment = new Paragraph(text)
    this.add(comment)

    var time = new Time(date)
    this.add(time)

    var like = new Button(emoji || '👎')
    this.add(like)
    like.container.style.marginTop = '20px'

    like.addBehaviour('click', function (event) {
        var currentEmoji = like.getText();
        like.setText(currentEmoji === '👍' ? '👎' : '👍')
    })
}

PostItem.extends(Compo)
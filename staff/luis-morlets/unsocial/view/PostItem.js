function PostItem(username, image, text, date, likes) {
    Compo.call(this, document.createElement('li'))

    var self = this

    var userTitle = new Heading(username, 4)
    self.add(userTitle)

    var picture = new Image(image)
    self.add(picture)

    var likesContainer = new Division()
    self.add(likesContainer)

    var likeButton = new Button('🤍', 'button')
    likeButton.container.style.cursor = 'pointer'
    likesContainer.add(likeButton)

    var countLikes = new Span(likes)
    likesContainer.add(countLikes)

    likeButton.addBehavior('click', function () {
        if (likeButton.getText() === '🤍') {
            likes++;
            countLikes.setText(likes)
            likeButton.setText('❤️')
        } else {
            likes--;
            countLikes.setText(likes)
            likeButton.setText('🤍')
        }
    })

    var comment = new Paragraph(text)
    self.add(comment)

    var time = new Time(date)
    self.add(time)
}

PostItem.extends(Compo)
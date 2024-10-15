function PostItem(username, image, text, date, likes) {
    Compo.call(this, document.createElement('li'))

    var userTitle = new Heading(username, 4)
    this.add(userTitle)

    var picture = new Image(image)
    this.add(picture)

var likesContainer = new Division()
    this.add(likesContainer)
    var buttonLikes = new Button('🤍', 'button')
    buttonLikes.container.style.cursor = 'pointer'
    likesContainer.add(buttonLikes)
    var countLikes = new Span(likes)
    likesContainer.add(countLikes)


buttonLikes.addBehavior('click', function(){
    if(buttonLikes.getText() === '🤍') {
        likes++
        countLikes.setText(likes)
        buttonLikes.setText('❤️')
        } else{
            buttonLikes.setText('🤍')
            likes--
            countLikes.setText(likes)
        }
    }
)
    var comment = new Paragraph(text)
    this.add(comment)

    var time = new Time(date)
    this.add(time)
}

PostItem.extends(Compo)


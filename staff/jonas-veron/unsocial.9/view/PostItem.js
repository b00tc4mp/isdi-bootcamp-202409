function PostItem(username, image, text, date, likes, likedBy) {
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

    var hasLiked = false


buttonLikes.addBehavior('click', function(){
    if(!hasLiked){
        likes++
        countLikes.setText(likes)
        buttonLikes.setText('❤️')
        hasLiked = true
        posts.likedBy = loggedInUser.username
        posts.likes = likes
        } else{
            buttonLikes.setText('🤍')
            likes--
            countLikes.setText(likes)
            hasLiked = false

            delete posts.likedBy[loggedInUser.username]
        }
    }.bind(this))
    var comment = new Paragraph(text)
    this.add(comment)

    var time = new Time(date)
    this.add(time)
}

PostItem.extends(Compo)


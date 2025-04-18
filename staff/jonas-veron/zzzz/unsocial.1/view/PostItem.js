class PostItem extends Compo {
    constructor(username, image, text, date, likes, likedBy) {
    super(document.createElement('li'))

        const userTitle = new Heading(username, 4)
        this.add(userTitle)

        const picture = new Image(image)
        this.add(picture)

        const likesContainer = new Division()
        this.add(likesContainer)
        const buttonLikes = new Button('🤍', 'button')
        buttonLikes.container.style.cursor = 'pointer'
        likesContainer.add(buttonLikes)
        const countLikes = new Span(likes)
        likesContainer.add(countLikes)

        
        
        if(likedBy[loggedInUser.username]) {
            hasLiked = true
        } else{
            hasLiked = false
        }

        if(hasLiked){
            buttonLikes.setText('❤️')
        }

    buttonLikes.addBehavior('click', () => {
    if(!likedBy[loggedInUser.username]){
        likes++
        countLikes.setText(likes)
        buttonLikes.setText('❤️')
        likedBy[loggedInUser.username] = true
        } else{
            buttonLikes.setText('🤍')
            likes--
            countLikes.setText(likes)
            likedBy[loggedInUser.username] = false

        }
    })
    const comment = new Paragraph(text)
    this.add(comment)

    const time = new Time(date)
    this.add(time)
    }
}




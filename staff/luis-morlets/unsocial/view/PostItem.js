class PostItem extends Compo {
    constructor(username, image, text, date, likes, likedBy) {
        super(document.createElement('li'))

        const userTitle = new Heading(username, 4)
        this.add(userTitle)

        const picture = new Image(image)
        this.add(picture)

        const likesContainer = new Division()
        this.add(likesContainer)

        const likeButton = new Button('🤍', 'button')

        likeButton.container.style.cursor = 'pointer'
        likesContainer.add(likeButton)

        const countLikes = new Span(likes)
        likesContainer.add(countLikes)

        if (likedBy[loggedInUser.username]) {
            hasLiked = true
        } else {
            hasLiked = false
        }

        if (hasLiked) {
            likeButton.setText('❤️')
        }

        likeButton.addBehavior('click', () => {
            try {
                if (!likedBy[loggedInUser.username]) {
                    likes++
                    countLikes.setText(likes)
                    likeButton.setText('❤️')
                    likedBy[loggedInUser.username] = true
                } else {
                    likes--
                    likeButton.setText('🤍')
                    countLikes.setText(likes)
                    likedBy[loggedInUser.username] = false
                }
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })

        const comment = new Paragraph(text)
        this.add(comment)

        const time = new Time(date)
        this.add(time)
    }
}
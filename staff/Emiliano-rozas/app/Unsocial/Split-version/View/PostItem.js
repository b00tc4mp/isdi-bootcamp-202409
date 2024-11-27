class PostItem extends Compo {
    constructor(username, image, text, date, likes, likeBy) {
        super(document.createElement('li'))

        const userTitle = new Heading(username, 4)
        this.add(userTitle)

        const picture = new Image(image)
        this.add(picture)

        const div = new Division()
        this.add(div)

        const likeButton = new Button("👍", "button")
        div.add(likeButton)

        const countLikes = new Span(likes)

        div.add(countLikes)

        let hasLiked = false
        /*likeButton.addBehavior('click', function (event) {
            count++
            countLikes.setText(count)
    
        })*/

        likeButton.addBehavior('click', () => {
            if (!hasLiked) {
                likeButton.getText() === "👍"
                likes++;
                hasLiked = true
                likeBy = loggedInUser.username
                countLikes.setText(likes)
                likeButton.setText('👎')
                postMessage.likes = likes
            } else {
                likes--;
                countLikes.setText(likes)
                likeButton.setText('👍')
                hasLiked = false

                delete postMessage.likeBy[loggedInUser.username]
            }
        })

        const comment = new Paragraph(text)
        this.add(comment)

        const time = new Time(date)
        this.add(time)

    }

}


class Post extends Compo {
    constructor(username, image, text, date) {
        super(document.createElement('div'))

        var userTitle = new Heading(username, 4)
        this.add(userTitle)
        userTitle.container.classList.add('post-username')

        var picture = new Image(image)
        this.add(picture)

        var likes = new Span('😊')
        likes.container.classList.add('post-button')
        this.add(likes)

        likes.addBehavior('click', function (event) {
            event.preventDefault()
            if (likes.getText() === '😊') {
                likes.setText('🥰')
            } else {
                likes.setText('😊')
            }
        })

        var comment = new Paragraph(text)
        this.add(comment)

        var time = new Time(date)
        time.container.classList.add('time')
        this.add(time)

        this.container.classList.add('post-container')
    }
    getText() {
        return this.children[0].container.value
    }
    setText(value) {
        this.container.value = value
    }
}

class PostItem extends Compo {
    constructor(username, image, text, date, emoji) {
        super(document.createElement('article'))
        this.container.style.display = 'flex'
        this.container.style.flexDirection = 'column'
        this.container.style.justifyContent = 'center'
        this.container.style.textAlign = 'center'
        this.container.style.alignItems = 'center'

        const userTitle = new Heading(username, 4)
        userTitle.container.style.textDecoration = 'underline'
        userTitle.container.style.color = 'yellow'
        userTitle.container.style.marginTop = '100px'
        this.add(userTitle)

        const picture = new Image(image)
        this.add(picture)

        const comment = new Paragraph(text)
        this.add(comment)

        const time = new Time(date)
        this.add(time)

        const like = new Button(emoji || '👎')
        this.add(like)
        like.container.style.marginTop = '20px'

        like.addBehaviour('click', event => {
            var currentEmoji = like.getText();
            like.setText(currentEmoji === '👍' ? '👎' : '👍')
        })
    }
}
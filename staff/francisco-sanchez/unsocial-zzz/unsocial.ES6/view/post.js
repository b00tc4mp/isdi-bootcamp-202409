/**
 * 
 * @param {*} username 
 * @param {*} image 
 * @param {*} text 
 * @param {*} date 
 */

class Post extends Compo {
    constructor(username, image, text, date) {
        super(document.createElement('div'))

        let userTitle = new Heading(username, 4)
        this.add(userTitle)

        let picture = new Image(image)
        this.add(picture)

        //Ini Aquí añadimos los iconos de like
        let likeIcon = new PostIcons('❤️')
        likeIcon.container.style.cursor = 'pointer'
        this.add(likeIcon)

        let commentIcon = new PostIcons('💭')
        commentIcon.container.style.cursor = 'pointer'
        this.add(commentIcon)
        //Fin Aquí añadimos los iconos de like

        let comment = new Paragraph(text)
        this.add(comment)

        let time = new Time(date)
        this.add(time)
    }
}
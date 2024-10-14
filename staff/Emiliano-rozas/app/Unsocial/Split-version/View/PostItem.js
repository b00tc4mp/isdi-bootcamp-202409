function PostItem(username, image, text, date, likes) {
    Compo.call(this, document.createElement('li'))

    var userTitle = new Heading(username, 4)
    this.add(userTitle)

    var picture = new Image(image)
    this.add(picture)

    var div = new Division()
    this.add(div)

    var likeButton = new Button("👍", "button")
    div.add(likeButton)

    var countLikes = new Span(likes)
    div.add(countLikes)


    /*likeButton.addBehavior('click', function (event) {
        count++
        countLikes.setText(count)

    })*/

    likeButton.addBehavior('click', function () {
        if (likeButton.getText() === "👍") {
            likes++;
            countLikes.setText(likes)
            likeButton.setText('👎')
        } else {
            likes--;
            countLikes.setText(likes)
            likeButton.setText('👍')
        }
    })







    var comment = new Paragraph(text)
    this.add(comment)

    var time = new Time(date)
    this.add(time)

}

PostItem.extends(Compo)

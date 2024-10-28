function Like(id) {
    Compo.call(this, document.createElement("div"))
    this.container.style.display = "flex"

    var likeButton = new Input("text", id)
    this.add(likeButton)

    var likes = Span("❤️")
    this.add(likes)

}

Like.extends(Compo)
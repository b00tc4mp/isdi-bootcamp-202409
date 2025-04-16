class PostIcons extends Compo {
    constructor(icon) {
        super(document.createElement('span'))

        let spanLike = new Span(icon)
        this.add(spanLike)
    }
}

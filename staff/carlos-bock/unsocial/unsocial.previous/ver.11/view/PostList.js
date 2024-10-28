function PostList() {
    Compo.call(this, document.createElement('div'));

    var title = new Heading('Posts', 3);
    this.add(title);

    try {
        var posts = getPosts().toReversed()

        posts.forEach(function (post) {
            var postItem = new Post(post.username, post.image, post.text, post.date);

            this.add(postItem);
        }.bind(this));
    } catch (error) {
        alert(error.message);

        console.error(error);
    };
};

PostList.extends(Compo);
//PostList.prototype = Object.create(Compo.prototype);
//PostList.prototype.constructor = PostList; 
var html = document.children[0]

var tree = function (object) {

    console.log(object.tagName)

    for (var i = 0; i < object.children.length; i++) {
        tree(object.children[i])
    }
}

tree(html)

 var html = document.children[0] 
 dom(html)


 function pickTagName(element) {
    console.log(element.tagName);
    for (var i = 0; i < element.children.length; i++) {
        pickTagName(element.children[i]); //call the function again, but now with each one of the children
    }
 }
var html = document.children[0]; // start from the element <html>
pickTagName(html); //call the function with <html> as starting point


 
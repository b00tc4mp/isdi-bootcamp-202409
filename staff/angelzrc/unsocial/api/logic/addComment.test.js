import db from 'dat'
import addComment from "./addComment.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')

    .then(() => {
        try {
            console.log(addComment('672cd8e6fcf48026d6c1c18e', '672dc95ba4e1fabd66c1c18d', 'nuevo comentario'))
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)

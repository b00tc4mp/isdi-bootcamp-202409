import db from 'dat'
import addComment from "./addComment.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')

    .then(() => {
        try {
            console.log(addComment('67329789df9459b8aeb92929', '67329982470b2f23bee21dbc', 'nuevo comentario'))
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)

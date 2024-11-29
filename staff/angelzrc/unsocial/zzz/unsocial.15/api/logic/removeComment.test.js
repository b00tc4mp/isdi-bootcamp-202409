import db from 'dat'
import removeComment from "./removeComment.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            console.log(removeComment('672cd8e6fcf48026d6c1c18e', '672dc95ba4e1fabd66c1c18d', '67308e322fbcbeeb0bacb3a7'))
        } catch (error) {
            console.error(error)
        }
    })


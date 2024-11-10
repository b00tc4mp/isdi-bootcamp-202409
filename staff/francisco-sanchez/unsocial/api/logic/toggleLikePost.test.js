import db from 'dat'
import toggleLikePost from "./toggleLikePost.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            //userId / PostId
            toggleLikePost('672e233ebd3432d3ba964533', '672f7aef4ee4e332926502a9')
                .then((result) => console.log(result.message))
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
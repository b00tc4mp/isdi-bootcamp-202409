import db from "../../dat/index.js"
import createPost from "./createPost.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      createPost('672e587fd5d1fe4cf716c1ce', 'https://img.freepik.com/fotos-premium/autorretrato-hombre-asiatico-guapo-sonriente-peinado-moda-gafas-traje-agradable_343801-608.jpg', '私はとてもハンサムです')
        .then(() => console.log('post created'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
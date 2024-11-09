import { MongoClient, ObjectId } from 'mongodb'

function connect(mongoUrl) { //creo un cliente y llamo a connect, que es un proceso asíncrono y es una promise chain q permite encadenar otras promesas
    const client = new MongoClient(mongoUrl) //servidor al q conectamos

    return client.connect() //promesa q se ejecuta
        .then(connection => { //promesa con callback q se encolará y se ejecutará cuando se haya ejecutado la anterior. En cada then hay un callback
            const db = connection.db() //elegimos en el paréntesis la base de datos de mongo a usar

            this.users = db.collection('users') //manejador para usuarios. uso this porq esa función es un método del objeto db
            this.posts = db.collection('posts') //manejador para posts
        })
}

const db = { //objeto a exportar
    connect, //exporto esta función con el objeto db
    users: null,
    posts: null,
    ObjectId
}

export default db

//db.posts.find({}).toArray().then(console.log) ==> para buscar todos
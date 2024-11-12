import { MongoClient, ObjectId } from "mongodb";

function connect(mongoUrl) {
    const client = new MongoClient(mongoUrl);

    return client.connect()
    .then(() => {
        const db = client.db();

        this.users = db.collection('users');
        this.posts = db.collection('posts');

        this.disconnect = () => client.close();
    });
};

const db = {
    connect,
    users: null,
    posts: null,
    disconnect: null,
    ObjectId
}

export default db;
import fs from 'fs';

export default {
    get users () {
        const json = fs.readFileSync('.data/users.json', 'utf-8');

        const users = JSON.parse(json);

        return users;
    },

    set users (users) {
        const json = JSON.stringify(users);

        fs.writeFileSync('./data/users.json', json)
    },

    get posts(){
        const json = fs.readFileSync('./data/posts.json', 'utf-8');

        const posts = JSON.parse(json);

        return posts;
    },

    set posts(posts) {
        const json = JSON.stringify(posts);

        fs.writeFileSync('./data/posts.json', json);
    }
}
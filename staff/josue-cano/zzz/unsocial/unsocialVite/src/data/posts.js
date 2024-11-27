const posts = [
    {
        id:'4qadijryzrc',
        image: 'https://www.mundodeportivo.com/alfabeta/hero/2024/01/the-flash-dc-comics.jpg?width=1200',
        text: 'speed men',
        username: 'flash',
        fans: [],
        date: new Date
    },
    {
        id:'4qadimtuap0',
        image: 'https://images.desenio.com/zoom/wb0125-8batman-portrait50x70-55544-10774.jpg',
        text: 'Darkness is my life, the shadow I walk in, unseen but ever present.The city calls for justice, but the light is not for me, only the night.In the depths of Gotham, I am the silence that ends the fear.',
        username: 'batman',
        fans: [],
        date: new Date
    }
]

const persistedPost = JSON.parse(localStorage.getItem("posts"))

if(persistedPost == undefined){
    //convierto la array en un string
    localStorage.setItem("posts",JSON.stringify(posts));
}

function loadPosts(){
    
    const persistedPost = JSON.parse(localStorage.getItem("posts"))

if(persistedPost == undefined){
    //convierto la array en un string
    localStorage.setItem("posts",JSON.stringify(posts));
}
}

export default loadPosts
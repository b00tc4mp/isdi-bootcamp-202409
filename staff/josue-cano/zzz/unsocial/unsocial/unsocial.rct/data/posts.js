const posts = [
    {
        id:'4qadijryzrc',
        image: 'https://www.mundodeportivo.com/alfabeta/hero/2024/01/the-flash-dc-comics.jpg?width=1200',
        text: 'speed men',
        username: 'flash',
        date: new Date
    },
    {
        id:'4qadimtuap0',
        image: 'https://images.desenio.com/zoom/wb0125-8batman-portrait50x70-55544-10774.jpg',
        text: 'darknes is my life',
        username: 'batman',
        date: new Date
    }
]

const persistedPost = JSON.parse(localStorage.getItem("posts"))

if(persistedPost == undefined){
    //convierto la array en un string
    localStorage.setItem("posts",JSON.stringify(posts));
}


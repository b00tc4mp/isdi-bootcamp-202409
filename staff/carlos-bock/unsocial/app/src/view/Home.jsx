import { useEffect, useState } from "react";

import { Post } from './components';

import logic from "../logic";

import './Posts.css';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('Posts -> useEffect "componentDidMout"');

        try {
            logic.getPosts((error, posts)=> {
                if (error) {
                    alert(error.message);

                    console.error(error);

                    return;
                }

                setPosts(posts);
            })
        } catch (error) {
            alert(error.message);

            console.error(error);
            
        }
    },[]);

    const handleLiked = () => {
        try {
            logic.getPosts((error, posts) => {
                if(error) {
                    alert(error.message);

                    console.error(error);

                    return;
                }
                setPosts(posts);
            })
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    }

    const handleDeleted = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message);

                    console.error(error);

                    return;
                };

                setPosts(posts)
            });
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    }

    const handleCommentAdded = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message);

                    console.error(error);

                    return;
                }

               setPosts(posts);
            });
        } catch (error) {
            alert(error.message);

            console.error(error);
        };
    };

    const handleCommentRemoved = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    alert(error.message);

                    console.error(error);

                    return;
                };

                setPosts(posts);
            });
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

 
        console.log('Posts -> render')

        return <div className="py-12">
            {posts.map(post => <Post
                key={post.id}
                post = {post}
                onLiked={handleLiked}
                onDeleted={handleDeleted}
                onCommentAdded={handleCommentAdded}
                onCommentRemoved={handleCommentRemoved}                
            />)}
        </div>
};

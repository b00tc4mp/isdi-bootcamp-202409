import { useEffect, useState } from "react";

import Comment from './Comment';
import AddComment from './AddComment';

import logic from '../../logic';

export default function Comments (props) {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        console.log('Comments -> useEffect "componentDidMount');
        try {
            logic.getComments(this.props.postId, (error, comments) => {
                if (error) {
                    alert(error.message);

                    console.error(error);

                    return;
                }
                setComments(comments);
            });
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    }, []);       

    const handleAdded = () => {
        try {
            logic.getComments(props.postId, (error, comments) => {
                if (error) {
                    alert(error.message);
                
                    console.error(error);
                
                    return;
                }
                setComments(comments)

                props.onAdded();
            });

        } catch (error) {
            alert(error.message);

            console.error(error);
        };
    };

    const handleRemoved = () => {
        try {
            logic.getComments(props.postId, (error, comments) => {
                if (error) {
                    alert(error.message);
                    
                    console.error(error);
                    
                    return;
                }
                
                setComments(comments);

                props.onRemoved();
            });

        } catch (error) {
            alert(error.message)

            console.error(error)
        };
    };
    console.log('Comments -> render ');  

        return <section>
            <ul>
                {comments.comments.map(comment =>
                    <Comment
                        key={comment.id}
                        postId={props.postId}
                        comment={comment}
                        onRemoved={handleRemoved}                    
                    />)
                }
            </ul>

            <AddComment
                postId={props.postId}
                onAdded={handleAdded}
            />
        </section>
    };


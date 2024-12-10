
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logic from '../../logic'
import { getElapsedTime } from '../../util'
import useContext from '../useContext'


export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)
    const navigate = useNavigate()
    const { alert, confirm } = useContext()
    const handlePostClick = () => navigate('/post/' + id)
    const {
        id,
        author,
        image,
        text,
        date,
        petTYpe,
        whatHappened,
        petGender,
        liked,
        likes,
        address

    } = post

    const handleLikeClick = () => {
        try {
            logic.toggleLikePost(id)
                .then(onLiked)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDeleteClick = () => {
        confirm('Delete post?', accepted => {
            if (accepted) {
                try {
                    logic.deletePost(id)
                        .then(onDeleted)
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        })
    }


    console.log('Post -> render')

    return <article className="m-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt="" onClick={handlePostClick} />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <p className="mb-3 font-normal text-gray-700">{text}</p>
            <time>{getElapsedTime(date)} ago</time>
            <div className="flex justify-end">
                <a href={"tel:" + post?.author?.phone} className="from-primary-light to-primary-dark bg-gradient-to-b text-center rounded-full -mt-9 px-10 py-2.5 ">Call</a>
            </div>
        </div>
    </article>


    {/* <article className="Post" >

        <img src={image} />

        <p>{text}</p>

        <time>{getElapsedTime(date)} ago</time>


        {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑️</Button>}

        {logic.isUserRoleModerator() && <Button>💀</Button>}

    </article > */}
}
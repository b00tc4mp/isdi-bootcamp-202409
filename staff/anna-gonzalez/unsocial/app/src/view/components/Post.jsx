import { useState } from 'react'
import { Button } from '../library'
import Comments from './Comments'
import logic from '../../logic'
import { getElapsedTime } from '../../util'
import useContext from '../useContext'
import { errors } from 'com'

const { SystemError } = errors

export default function Post({ post, onLiked, onSaved, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const { alert, confirm } = useContext()

    const {
        id,
        author,
        image,
        text,
        date,
        liked,
        saved,
        likes,
        saves,
        comments
    } = post

    const handleSavedClick = () => {
        try {
            logic.toggleSavePost(id)
                .then(onSaved)
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLikeClick = () => {
        try {
            logic.toggleLikePost(id)
                .then(onLiked)
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                            if (error instanceof SystemError)
                                alert('Sorry, try again later')
                            else
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

    const handleCommentsClick = () => setView(view ? null : 'comments')

    console.log('Post -> render')

    console.log('Post -> render')

    return <article className="w-96 flex flex-col border-2 border-[#2A31FF] rounded-[15px] mb-8">
        <div className="flex flex-row justify-between items-center pr-2 text-left">
            <h4 className="pl-4 text-[#2A31FF]">{author.username}</h4>

            {/*logic.getUserRole() === 'moderator' && <Button>💀</Button>*/}
            {logic.isUserRoleModerator() && <Button>💀</Button>}

            <Button className="flex flex-end w-[200px] box-border px-5 py-[5px] font-dela-gothic-one bg-transparent rounded-[25px] border-0 text-lg mb-4 text-[#2A31FF] cursor-pointer hover:bg-transparent flex-row justify-around p-0 m-0 text-left"
                onClick={handleSavedClick}>{`📌 ${saves}`}</Button>
        </div>

        <img src={image} className="w-full" />

        <p className="pl-4 pr-3 mb-[0.1rem]">{text}</p>

        <time className="pl-4 pr-3  text-xs mt-0 mb-4 text-gray-500">{getElapsedTime(date)} ago</time>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}

        <div className="flex flex-row justify-evenly items-center text-[#92FF9D] bg-[#2A31FF] rounded-bl-[12px] rounded-br-[12px]">
            <Button className="w-[200px] box-border px-5 py-[5px] font-dela-gothic-one bg-[#2A31FF] rounded-[25px] border-0 text-lg mb-4 text-white cursor-pointer hover:bg-[#0a11cc]"
                onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes}`}</Button>

            {author.id === logic.getUserId() && <Button className="w-[200px] box-border px-5 py-[5px] font-dela-gothic-one bg-[#2A31FF] rounded-[25px] border-0 text-lg mb-4 text-white cursor-pointer hover:bg-[#0a11cc]"
                onClick={handleDeleteClick}>❌</Button>}

            <Button className="w-[200px] box-border px-5 py-[5px] font-dela-gothic-one bg-[#2A31FF] rounded-[25px] border-0 text-lg mb-4 text-white cursor-pointer hover:bg-[#0a11cc]"
                onClick={handleCommentsClick}>💬 {comments}</Button>
        </div>
    </article >
}
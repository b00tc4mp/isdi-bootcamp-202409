import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logic from '../../logic'
import { getElapsedTime } from '../../util'
import useContext from '../useContext'
import AdMap from './AdMap'

export default function Post({ post, userId, onDeleted }) {
    const [view, setView] = useState(null)
    const navigate = useNavigate()
    const { alert, confirm } = useContext()
    const handlePostClick = () => navigate('/post/' + id)
    const {
        id,
        image,
        text,
        date,
        location,
    } = post

    const handleLocationClick = () => setView(view ? null : 'location')
    const handleCloseMap = () => setView(null)

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

    return <article className="m-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt="" onClick={handlePostClick} />

        <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <p className="mb-3 font-normal text-gray-700">{text}</p>
            <time>{getElapsedTime(date)} ago</time>
            {/* Ubicación */}
            {location && (
                <div className="flex items-center mt-2"
                    onClick={handleLocationClick} // Abre el modal del mapa
                >
                    <img
                        src="assets/map.svg"
                        alt="Location"
                        className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">
                        {location.address || 'Unknown location'}
                    </span>
                </div>
            )}


            <div className="flex justify-end">
                <a href={"tel:" + post?.author?.phone} className="from-primary-light to-primary-dark bg-gradient-to-b text-center rounded-full  px-10 py-2.5 text-white">Call</a>
            </div>
            {userId === post.author.id || logic.isUserRoleModerator() ?
                <button type="button" onClick={handleDeleteClick}>
                    <img className="w-4 h-4" src="./assets/remove.svg" />
                </button> : null
            }
        </div>

        {/* Modal para el mapa */}
        {view === 'location' && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full overflow-hidden">
                <div className="relative bg-white rounded-lg shadow-lg w-full overflow-hidden">
                    <button
                        onClick={handleCloseMap}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                        ✖
                    </button>
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4 text-center text-gray-700">
                            Ubicación
                        </h2>
                        <div className='overflow-hidden'>
                            <AdMap
                                coordinates={location.coordinates}
                                address={location.address}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )}

    </article>
}
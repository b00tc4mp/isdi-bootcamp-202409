import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logic from '../logic'
import { getElapsedTime } from '../util'
import AdMap from './components/AdMap'
import useContext from './useContext'
import { Header } from './components'

export default function Post() {
    const [post, setPost] = useState([])
    const [view, setView] = useState(null)
    const { confirm } = useContext()
    const userId = logic.getUserId()
    const { postId } = useParams()
    useEffect(() => {
        try {
            logic.getPostById(postId)
                .then(setPost)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleLocationClick = () => setView(view ? null : 'location')
    const handleCloseMap = () => setView(null)
    const handleFoundClick = () => {
        confirm('Have you found your pet?', accepted => {
            if (accepted) {
                try {
                    logic.petFound(postId)
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

    return <div className="pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        <Header />
        <article className="m-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={post.image} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <p className="mb-3 font-normal text-gray-700">{post.text}</p>
                <time>{getElapsedTime(post.date)} ago</time>
                <div className="flex justify-end">
                    <a href={"tel:" + post?.author?.phone} className="from-primary-light to-primary-dark bg-gradient-to-b text-center rounded-full -mt-9 px-10 py-2.5 text-white">Call</a>
                </div>
            </div>
            {post.location && (
                <div className="flex items-center mt-2"
                    onClick={handleLocationClick} // Abre el modal del mapa
                >
                    <img
                        src="/assets/map.svg"
                        alt="Location"
                        className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">
                        {post.location.address || 'Unknown location'}
                    </span>
                </div>
            )}
        </article>

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
                                coordinates={post.location.coordinates}
                                address={post.location.address}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )}

        {post?.author?.id === userId && post.whatHappened === 'lost' ? <div className="flex w-full justify-center">
            <button onClick={handleFoundClick} className='from-primary-light to-primary-dark text-xl bg-gradient-to-b text-center rounded-full px-10 py-2.5'>
                I have found!
            </button>
        </div> : null}

    </div>
}



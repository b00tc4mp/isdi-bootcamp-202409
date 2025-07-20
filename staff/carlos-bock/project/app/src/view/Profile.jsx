import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logic from '../logic/index.js'
import Recommend from './components/Recommend.jsx'
import useContext from './useContext.js'

export default function Profile() {
    const { userId } = useParams()
    const [recommends, setRecommends] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { alert } = useContext()

    useEffect(() => {
        const getRecommends = async () => {
            try {
                const data = await logic.getRecommendByUser(userId)
                setRecommends(data)
            } catch (error) {
                setError(error.message)

                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getRecommends()

    }, [userId, alert])

    if (loading) { return <p>Cargando...</p> }
    if (error) { return <p>El servicio no esta disponible en esto</p> }
    if (!recommends) return <p>La recomendaciones no está disponible en estos momentos, lo sentimos.</p>

    const handleUpVote = () => {
        try {
            logic.getRecommend()
                .then(setRecommends)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDownVote = () => {
        try {
            logic.getRecommend()
                .then(setRecommends)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDeleted = () => {
        try {
            logic.getRecommend()
                .then(setRecommends)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentAdded = () => {
        try {
            logic.getRecommend()
                .then(setRecommends)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Recommendations by User -> render')

    if (!recommends.length) return <p>No hay recomendaciones asociadas con tu cuenta en este momento. Empieza a armar tu red, nos ayudamos entre todos. </p>;

    return <main className='mt-8'>
        <h4>Estas son todas las recomendaciones asociadas con tu cuenta: </h4>
        <div>
            {recommends.map((recommend) => (
                <Recommend
                    key={recommend.id}
                    recommend={recommend}
                    onUpVote={handleUpVote}
                    onDownVote={handleDownVote}
                    onDeleted={handleDeleted}
                    onCommentAdded={handleCommentAdded}
                />
            ))}
        </div>

    </main>
}
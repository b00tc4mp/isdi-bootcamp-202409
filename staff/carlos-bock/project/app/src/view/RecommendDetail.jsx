import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logic from '../logic/index.js'
import Button from './library/Button.jsx'
import getElapsedTime from '../util/getElapsedTime.js'
import useContext from './useContext.js'
import CommentsInRec from './components/CommentsInRec.jsx'

export default function RecommendDetail() {
    const { id } = useParams()
    const [recommend, setRecommend] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [view, setView] = useState(null)
    const { alert } = useContext()

    useEffect(() => {
        const getRecommend = async () => {
            try {
                const data = await logic.getRecommendById(id)
                setRecommend(data)
            } catch (error) {
                setError(error.message)

                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getRecommend()

    }, [id, alert])


    const handleCommentsClick = () => setView(view ? null : 'comments')

    if (loading) { return <p>Cargando...</p> }
    if (error) { return <p>Error: {error}</p> }
    if (!recommend || Object.keys(recommend).length === 0)
        return <p>La recomendación no está disponible en estos momentos, lo sentimos.</p>

    const { subject, date, country, city, price, category, text, comments, image } = recommend

    return <article>
        <h2>{subject}</h2>
        <time>Hacen {getElapsedTime(date)}</time>
        <h3>{country} | {city} | {price === 1 ? '€' : price === 2 ? '€€' : '€€€'}</h3>

        <h3>{subject} | {category === 1 ? 'trámites' : category === 2 ? 'servicios' :
            category === 3 ? 'alimentación' : category === 4 ? 'eventos' : category === 5 ? 'sanidad' :
                category === 6 ? 'barrios' : category === 7 ? 'vivienda' : 'transporte'} |
        </h3>

        <p>{text}</p>

        <Button onClick={handleCommentsClick}>💬 </Button>

        {view === 'comments' && (
            <CommentsInRec
                recommendId={id}
                recommendText={text}
            />)}

        {logic.isUserModerator() && <Button>🧯</Button>}

        <img className='img' src={image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/180px-HTTP_logo.svg.png'} alt={subject} />
    </article>
}

//{comments.length}
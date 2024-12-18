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

    return <article className='mt-10'>
        <h2 className='font-bold text-xl'>{subject}</h2>
        <time>Hacen {getElapsedTime(date)}</time>
        <h3 className='font-bold'>{country} | {city} | {price === 1 ? '€' : price === 2 ? '€€' : '€€€'}</h3>

        <h3 className='font-bold'>{subject} | {category === 1 ? 'trámites' : category === 2 ? 'servicios' :
            category === 3 ? 'alimentación' : category === 4 ? 'eventos' : category === 5 ? 'sanidad' :
                category === 6 ? 'barrios' : category === 7 ? 'vivienda' : 'transporte'} |
        </h3>

        <p className='mt-4 mb-10'>{text}</p>

        <div className='ml-5 mb-5'><Button onClick={handleCommentsClick}>💬 </Button></div>

        <div className='ml-5 mr-5 border border-black rounded'>{view === 'comments' && (
            <CommentsInRec
                recommendId={id}
                recommendText={text}
            />)}</div>


        <img className='mt-5 w-[90%] mx-auto' src={image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/180px-HTTP_logo.svg.png'} alt={subject} />
    </article>
}

//{comments.length}

// {logic.isUserModerator() && <Button>🧯</Button>}

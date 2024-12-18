import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logic from '../logic/index.js'
import Recommend from './components/Recommend.jsx';
import useContext from './useContext.js'


export default function RecommendCategoryCountry() {
    const { category, country } = useParams()
    const [recommends, setRecommends] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { alert } = useContext()

    useEffect(() => {
        const getRecommends = async () => {
            try {
                const data = await logic.getRecommendByCategoryCoutry(category, country)
                setRecommends(data)
            } catch (error) {
                setError(error.message)

                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getRecommends()

    }, [category, country, alert])

    if (loading) { return <p>Cargando...</p> }
    if (error) { return <p>Error: {error}</p> }
    if (!recommends.length) return <p>La recomendaciones no está disponible en estos momentos, lo sentimos.</p>


    const handleUpVote = () => {
        try {
            logic.getRecommend()
                .then(setRecommend)
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
                .then(setRecommend)
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

    console.log('Recommendation Category + Country-> render')


    return (
        <div className='mt-12'>
            <h3 className='mb-4 font-bold'>
                Recomendaciones para:
                {category === '1' ? ' Trámites' :
                    category === '2' ? ' Servicios' :
                        category === '3' ? ' Alimentación' :
                            category === '4' ? ' Eventos' :
                                category === '5' ? ' Sanidad' :
                                    category === '6' ? ' Barrios' :
                                        category === '7' ? ' Vivienda' :
                                            ' Transporte'}
            </h3>

            <div>
                {recommends.map((recommend) =>
                    <Recommend
                        key={recommend.id}
                        recommend={recommend}
                        onUpVote={handleUpVote}
                        onDownVote={handleDownVote}
                        onDeleted={handleDeleted}
                        onCommentAdded={handleCommentAdded}
                    />
                )}
            </div>
        </div>
    )
}

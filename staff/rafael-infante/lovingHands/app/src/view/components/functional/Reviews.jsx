import { useState, useEffect } from 'react'

import Review from './Review'
import AddReview from './AddReview'

import logic from '../../../logic'

export default function Reviews(props) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    console.log('Reviews -> useEffect "componentdidMount"')

    try {
      logic
        .getReviews(props.adId)
        .then(setReviews)
        .catch((error) => {
          alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])

  const refreshReviews = () => {
    try {
      logic.getReviews(props.adId).then((reviews) => {
        setReviews(reviews)

        props.onRemoved()
      })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleRemoved = refreshReviews
  const handleAdded = refreshReviews

  return (
    <section>
      <ul>
        {reviews.map((review) => (
          <Review key={review.id} adId={props.adId} review={review} onRemoved={handleRemoved} />
        ))}
      </ul>

      <AddReview adId={props.adId} onAdded={handleAdded} />
    </section>
  )
}

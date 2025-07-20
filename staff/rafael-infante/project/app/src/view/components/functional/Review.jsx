import logic from '../../../logic'
import useContext from '../../useContext.js'

export default function Review({ adId, review: { id, author, comment, date, calification }, onRemoved }) {
  console.debug('Review -> render')

  const { alert, confirm } = useContext()

  const handleDeleteReview = () => {
    confirm(
      'Delete review?',
      (accepted) => {
        if (accepted) {
          try {
            logic
              .deleteReview(adId, id)
              .then(onRemoved)
              .catch((error) => {
                alert(error.message)
                console.error(error)
              })
          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }
      },
      'warn'
    )
  }

  return (
    <li className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-gray-800">{author.name}</h4>
        <span
          className={`inline-block px-2 py-1 rounded-md text-sm ${
            calification >= 4
              ? 'bg-green-100 text-green-700'
              : calification === 3
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {calification} ★
        </span>
      </div>
      <p className="text-gray-700 mb-2">{comment}</p>
      <time className="block text-sm text-gray-500">{date}</time>
      {logic.getUserId() === author.id && (
        <button onClick={handleDeleteReview} className="mt-3 text-red-600 hover:text-red-800 focus:outline-none">
          🗑️ Delete
        </button>
      )}
    </li>
  )
}

import logic from '../../../logic'
import useContext from '../../useContext.js'

export default function AddReview({ adId, onAdded }) {
  console.debug('AddReview -> render')

  const { alert } = useContext()

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const {
      comment: { value: comment },
      calification: { value: calification },
    } = form

    try {
      logic.addReview(adId, comment, Number(calification)).then(() => {
        form.reset()
        onAdded()
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Add a New Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <input
            type="text"
            name="comment"
            id="comment"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Write your comment here"
            required
          />
        </div>
        <div>
          <label htmlFor="calification" className="block text-sm font-medium text-gray-700">
            Calification
          </label>
          <select
            id="calification"
            name="calification"
            defaultValue=""
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>
              Select a value
            </option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

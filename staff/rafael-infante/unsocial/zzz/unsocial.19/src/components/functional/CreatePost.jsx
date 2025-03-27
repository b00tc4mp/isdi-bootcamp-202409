import createPost from "../../logic/createPost"

function CreatePost(props) {
  return (
    <div className="section-container">
      <form className="form-container" onSubmit={event => {
        event.preventDefault()
        const { target: form } = event

        const {
          image: { value: image },
          text: { value: text }
        } = form

        try {
          createPost(sessionStorage.loggedUserId, image, text)
          form.reset()
          props.onCreated()
        } catch (error) {
          alert(error.message)
          console.error(error)
        }
      }}>
        <h3>Create a Post</h3>
        <label htmlFor="image">Image</label>
        <input type="text" id="image" placeholder="Select an image" required />
        <label htmlFor="image">Text</label>
        <input type="text" id="text" placeholder="Write a text" required />
        <button id="submit" type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreatePost
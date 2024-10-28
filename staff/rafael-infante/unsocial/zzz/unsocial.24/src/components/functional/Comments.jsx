import './Comments.css'

function Comments() {
  return (
    <section className="Comments">
      <ul>
        <li>
          <h4>username</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis quisquam obcaecati.</p>
          <time>date</time>
        </li>
        <li>
          <h4>username</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis quisquam obcaecati.</p>
          <time>date</time>
        </li>
        <li>
          <h4>username</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis quisquam obcaecati.</p>
          <time>date</time>
        </li>
        <form>
          <label htmlFor="text"> New Comment</label>
          <textarea name="" id="text"></textarea>
          <button type='submit'>Send</button>
        </form>
      </ul>
    </section>
  )
}

export default Comments
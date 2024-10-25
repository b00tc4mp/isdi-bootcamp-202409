import getElapsedTime from "../../utils/getElapsedTime"

Comment = ({ comment: { author, text, date } }) => {
  return (
    <li>
      <h4>{author.username}</h4>
      <p>{text}</p>
      <time>{getElapsedTime(date)} ago</time>
      <a>🗑️</a>
    </li>
  )
}

export default Comment
import getElapsedTime from '../../utils/getElapsedTime'

export default (props) => {
  const { id: { date, text, author } } = props
  return <li>
    <h5>{author}</h5>
    <time>{getElapsedTime(date)}</time>
    <p>{text}</p>
  </li>
}
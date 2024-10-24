import getUserUsername from "../../logic/getUserUsername"
import getElapsedTime from "../../utils/getElapsedTime"

import './CommentItem.css'

export default props => {
    const { id: { author, text, date } } = props
    return <li className="CommentItem">
        <h5>{getUserUsername(author)}</h5>
        <p>{text}</p>
        <time>{getElapsedTime(date)}</time>
    </li>
}
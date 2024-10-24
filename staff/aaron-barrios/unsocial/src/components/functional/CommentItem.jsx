import getElapsedTime from "../../utils/getElapsedTime";

export default (props) => {
    const { id: { date, text, author } } = props

    return <li>
        <h5>{author}</h5>
        <h6>{text}</h6>
        <time >{getElapsedTime(date)}</time>
    </li>
}
import { useState } from "react"

import logic from "../../../logic"

import { getElapsedTime } from "../../../util"

export default function Event({ event }) {
  console.log("Post -> render")
  const [view, setView] = useState(null)

  const { id, author, image, text, date, liked, likes, comments } = event

  return (
    <article>
      <h4>{author.name}</h4>

      <img src={image} />
      <p>{text}</p>
      <time>Hace {getElapsedTime(date)}</time>
    </article>
  )
}

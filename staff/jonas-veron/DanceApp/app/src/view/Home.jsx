import logic from "../logic"
import { useState, useEffect } from "react"

export default function Home() {
  console.log("Home -> render")
  const [name, setName] = useState(null)

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message)
              console.error
            })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
    }
  }, [])
  return (
    <>
      <h1 className="pt-16 text-center text-cyan-50">Bienvenido {name}!!!</h1>
    </>
  )
}

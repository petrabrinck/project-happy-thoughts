import React, { useEffect, useState } from "react"
import { HappyThought } from "./components/HappyThought"
import { HappyForm } from "./components/HappyForm"

export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [postedMessage, setPostedMessage] = useState("")
  // const [likes, setLikes] = useState()

  //   const [heart, setHeart] = useState()
  //   relode thoughts, setreloadThoughts//

  useEffect(() => {
    fetch("https://technigo-thoughts.herokuapp.com/")
      .then(res => res.json())
      .then(json => setThoughts(json))
  }, [postedMessage])


  const handleFormSubmit = message => {
    fetch("https://technigo-thoughts.herokuapp.com/", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => setPostedMessage(message))
      .catch(err => console.log("error:", err))
  }


  return (
    <div>
      <HappyForm onFormSubmit={handleFormSubmit} />
      {thoughts.map(thought => (
        <HappyThought key={thought._id} thought={thought} />
      ))}
    </div>
  )
}

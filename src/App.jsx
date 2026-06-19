import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Randomuser = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getUser = async () => {
    try {
      setLoading(true)
      setError(false)

      const response = await axios.get("https://randomuser.me/api/")
      console.log(response.data.results)

      setUser(response.data.results[0])
      setLoading(false)
    } catch (error) {
      setError(true)   
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (error) {
    return <h1 className="text-red-500 min-h-screen flex flex-col justify-center items-center text-6xl">Something went wrong !!!</h1>
  }

  if (loading) {
    return <h1 className="text-blue-500 font-bold  text-6xl flex flex-col items-center ">Loading...</h1>
  }

 return (
  <div className="min-h-screen flex flex-col justify-center items-center ">
    <img
      src={user?.picture?.large}
      alt=""
      className="w-50 h-50 rounded-full"
    />

    <h2 className="mt-4 text-2xl">
      {user?.name?.first}
    </h2>

    <p>{user?.email}</p>

    <button
      onClick={getUser}
      className="mt-4 border px-4 py-2"
    >
      GENERATE USER
    </button>
  </div>
)
}

export default Randomuser
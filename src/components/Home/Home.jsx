import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex justify-center items-center h-screen text-center '>
        <Link to={'/traineeForm'} className=' bg-blue-500 mr-2 rounded-lg p-2'>Trainee Form</Link>
        <Link to={'/assistanteForm'} className=' bg-pink-500 rounded-lg p-2'>Assitante Form</Link>
    </div>
  )
}

export default Home
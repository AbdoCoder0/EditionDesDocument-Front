import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex justify-center items-center h-screen text-center gap-7'>
        <Link to={'/traineeForm'} className=' bg-blue-500  rounded-lg p-2'>Trainee Form</Link>
        <Link to={'/assistanteForm'} className=' bg-pink-500 rounded-lg p-2'>Assitante Form</Link>
        <Link to={'/assistanteTable'} className=' bg-purple-500 rounded-lg p-2'>Assitante Table</Link>
        <Link to={'/directeurTable'} className=' bg-green-500 rounded-lg p-2'>Directeur Table</Link>
    </div>
  )
}

export default Home
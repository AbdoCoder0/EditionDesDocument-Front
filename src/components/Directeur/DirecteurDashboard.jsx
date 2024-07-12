import React from 'react'
import { Link } from 'react-router-dom'

function DirecteurDashboard() {
  return (
    <div>
        DirecteurDashboard
        
        <Link to={'/directeurTable'} className=' bg-orange-500 rounded-lg p-2'>Directeur Table</Link>
        <button></button>
    </div>
  )
}

export default DirecteurDashboard
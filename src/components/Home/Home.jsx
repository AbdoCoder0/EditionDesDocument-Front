import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../atoms/Buttons'
import Labels from '../atoms/Labels'
import Inputs from '../atoms/Inputs'
import H1 from '../atoms/H1'
import H3 from '../atoms/H3'
import H2 from '../atoms/H2'
import Legends from '../atoms/Legends'
import Text from '../atoms/Text'

function Home() {
  return (
    <div className='flex justify-center items-center h-screen text-center gap-7'>
        <Link to={'/traineeForm'} className=' bg-blue-500  rounded-lg p-2'>Trainee Interface</Link>
        <Link to={'/assistanteForm'} className=' bg-pink-500 rounded-lg p-2'>Assitante Interface</Link>
        <Link to={'/directeurDash'} className=' bg-green-500 rounded-lg p-2'>Directeur Interface</Link>

        <Buttons type="primary" >hello</Buttons>
        <Buttons type="secondary" >hi</Buttons>
        <Buttons type="disabled" >no</Buttons>

        <div className="mb-4">
        <Labels htmlFor="exampleInput">Example Label</Labels>
        <Inputs 
          id="exampleInput" 
          // value={inputValue} 
          // onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter text"
        />


        <H1 color="blue">This is a Blue Heading</H1>
        <H1 color="orange">This is an Orange Heading</H1>
        <H2 color="blue">This is a Light Blue Heading</H2>
        <H2 color="orange">This is a Light Orange Heading</H2>
        <H3 color="light">This is a Light Grey Subheading</H3>
        <H3 color="medium">This is a Medium Grey Subheading</H3>
        <H3 color="dark">This is a Dark Grey Subheading</H3>
        <Text>This is the text </Text>
        <Legends>This is a legend</Legends>


      <div className="card p-4">
      <h2 className="card-title">title</h2>
      <p className="card-text">text</p>
    </div>


    {/* function ModalComponent({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{children}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-darkBlue text-white rounded">Close</button>
      </div>
    </div>
  );
} */}
      </div>
    </div>
  )
}

export default Home
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AssistanteForm from './components/Assistante/AssistanteDemande/AssistanteForm'
import TraineeForm from './components/Trainee/TraineeDemande/TraineeForm'
import Home from './components/Home/Home'


function App() {

  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='traineeForm' element={<TraineeForm />} />
          <Route path='assistanteForm' element={<AssistanteForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

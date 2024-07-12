import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AssistanteForm from './components/Assistante/AssistanteDemande/AssistanteForm'
import TraineeForm from './components/Trainee/TraineeDemande/TraineeForm'
import Home from './components/Home/Home'
import AssistanteTable from './components/Assistante/AssistanteTable'
import DirecteurTable from './components/Directeur/DirecteurTable'
import Header from './components/UI/Header/Header'
import DirecteurDashboard from './components/Directeur/DirecteurDashboard'


function App() {

  return (
    <div className=''>
      <Header/>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='traineeForm' element={<TraineeForm />} />
          <Route path='assistanteForm' element={<AssistanteForm />} />
          <Route path='assistanteTable' element={<AssistanteTable />} />
          <Route path='directeurDash' element={<DirecteurDashboard />} />
          <Route path='directeurTable' element={<DirecteurTable />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

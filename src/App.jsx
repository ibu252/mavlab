import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Competition from './pages/Competition'
import Teams from './pages/Teams'
import Publications from './pages/Publications'
import News from './pages/News'
import Awards from './pages/Awards'
import Research from './pages/Research'
import Team from './pages/Team'
import Vision from './pages/Vision'

function App() {
  // Get base path from import.meta.env.BASE_URL (set by Vite)
  const basePath = import.meta.env.BASE_URL || '/'
  
  return (
    <Router basename={basePath}>
      <div className="min-h-screen bg-gradient-to-b from-ocean-dark via-ocean-medium to-ocean-dark">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/news" element={<News />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/research" element={<Research />} />
          <Route path="/team" element={<Team />} />
          <Route path="/vision" element={<Vision />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


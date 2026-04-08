import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NehemiahLanding from './NehemiahLanding'
import NehemiahAbout from './NehemiahAbout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NehemiahLanding />} />
        <Route path="/about" element={<NehemiahAbout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NehemiahLanding from './NehemiahLanding'
import NehemiahAbout from './NehemiahAbout'
import NehemiahProject from './NehemiahProject'
import NehemiahContact from './NehemiahContact'
import NehemiahTerms from './NehemiahTerms'
import NehemiahPrivacy from './NehemiahPrivacy'
import NehemiahRefund from './NehemiahRefund'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NehemiahLanding />} />
        <Route path="/about" element={<NehemiahAbout />} />
        <Route path="/project" element={<NehemiahProject />} />
        <Route path="/contact" element={<NehemiahContact />} />
        <Route path="/terms" element={<NehemiahTerms />} />
        <Route path="/privacy" element={<NehemiahPrivacy />} />
        <Route path="/refund" element={<NehemiahRefund />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

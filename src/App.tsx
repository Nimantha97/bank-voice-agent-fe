import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import VoiceDashboard from './pages/VoiceDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/voice" element={<VoiceDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

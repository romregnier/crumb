import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Explore } from './pages/Explore'
import { Create } from './pages/Create'
import { CapsuleDetail } from './pages/CapsuleDetail'
import { Profile } from './pages/Profile'
import { MyCapsules } from './pages/MyCapsules'
import { Timeline } from './pages/Timeline'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/capsule/:id" element={<CapsuleDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-capsules" element={<MyCapsules />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

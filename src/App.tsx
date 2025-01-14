// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'
// import Navbar from './components/Tmbd/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Trending from './components/Tmbd/Trending'
import MovieDetails from './components/Tmbd/MovieDetails'
import Navbar from './components/Tmbd/Navbar'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

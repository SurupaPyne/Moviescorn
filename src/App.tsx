import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'
// import Navbar from './components/Tmbd/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Tmbd/Home'
import MovieDetails from './components/Tmbd/MovieDetails'
import Navbar from './components/Tmbd/Navbar'
import Login from './components/Tmbd/Login'
//import Protected from './components/Tmbd/Protected'
import Footer from './components/Tmbd/Footer'
import Movies from './components/Tmbd/Movies'
import TvShows from './components/Tmbd/TvShows'
import TvDetails from './components/Tmbd/TvDetails'
import About from './components/Tmbd/About'
function App() {
  const [isauthenticate, setIsauthenticate] = useState<boolean>(false)

  return (
    <>
      <BrowserRouter>
        <Navbar isauthenticate={isauthenticate} setIsauthenticate={setIsauthenticate} />
        <Routes>
          {/* <Route path="/" element={<Protected isauthenticate={isauthenticate}></Protected>}/> */}
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          {/* <Route path="/:id" element={<Protected isauthenticate={isauthenticate}><MovieDetails /></Protected>} />
          <Route path="/:id" element={<Protected isauthenticate={isauthenticate}><TvDetails /></Protected>} /> */}
          <Route path="/login" element={<Login setIsauthenticate={setIsauthenticate} />} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/series" element={<TvShows/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App;

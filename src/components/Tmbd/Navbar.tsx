// import logo from './assets/download.png';
import { useNavigate } from 'react-router-dom';
interface NavbarProps {
  isauthenticate: boolean; // Boolean to track authentication state
  setIsauthenticate: (value: boolean) => void; // Setter function for auth state
}
const Navbar: React.FC<NavbarProps> = ({ isauthenticate,setIsauthenticate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsauthenticate(false); // Clear auth state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#F5AD42" }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img src="/cinelogo.jpg" alt="Logo" style={{ height: "50px" }} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Homes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">Movies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/series">TV Shows</a>
            </li>
          </ul>
        </div>
        {(isauthenticate)?(<button className="btn btn-dark" onClick={handleLogout}>Logout</button>):(<button className="btn btn-dark" onClick={handleLogout}>Login</button>)} 
      </div>
    </nav>
  )
}
export default Navbar;
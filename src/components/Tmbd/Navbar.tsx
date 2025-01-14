// import logo from './assets/download.png';
const Navbar=()=>{
 return(
  <nav className="navbar navbar-expand-lg navbar-light mb-2" style={{ backgroundColor: "#F5AD42" }}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src="/cinelogo.jpg" alt="Logo" style={{ height: "50px" }}/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <a className="nav-link" href="#">Homes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Movies</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">TV Shows</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Trending</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Top Rated</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
 )
}
export default Navbar;
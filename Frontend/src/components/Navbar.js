import React from 'react';
import { Link, useHistory} from "react-router-dom";

function Navbar(props) {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setIsLogin(false); 
    history.push('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            {!localStorage.getItem('token') ? <form className='d-flex'>
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </form> : <button onClick={handleLogout} className='btn btn-primary'> Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

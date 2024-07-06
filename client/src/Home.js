
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            📚𝐄𝐃𝐔𝐂𝐀𝐑𝐄
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/adminsignup">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminlogin">
                  Login
                </Link>
              </li>
            

            
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <img
          src="img/bulb.webp"
          className="img-fluid"
          alt="Bulb" width={1500} height={200}
        />
      </div>
    </>
  );
}

export default Home;


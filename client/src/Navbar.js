import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import'react-toastify/dist/ReactToastify.css'

function NavBar(){
  const username = localStorage.getItem('username');
  const [data,setData]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    fetch('http://localhost:4002/teacherview').then((res) =>
      res.json()
    ).then((result) => 
    setData(result)
   
    )		
  }, []);
   const filterdata=data.filter((value)=>value.
   Teachername===username)


   useEffect(() => {
    fetch('http://localhost:4002/studentview').then((res) =>
      res.json()
    ).then((result) => {
    setData(result)
   
  }
    )		
  }, [])
  

  const handleLogout = () => {
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 1000,
      onClose: () => {
        navigate('/adminLogin');
      },
    });
  };
  const filterData=data.filter((value)=>value.Name===username)

    return(
        <>
       
    
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
       
      </a>
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars"></i>
      </a>
      <form className="d-none d-md-flex ms-4">
        <input className="form-control border-0" type="search" placeholder="Search" />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-envelope me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">John sent you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">John sent you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/school.jpeg" alt="" style={{ width: '40px', height: '40px' }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">John sent you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">See all messages</a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notification</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">See all notifications</a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
         

<img
    className="rounded-circle me-lg-2"
    src={filterdata.length > 0 ? `http://localhost:4002/${filterdata[0].Image}` : 
         (filterData.length > 0 ? `http://localhost:4002/${filterData[0].Image}` : "img/user.jpeg")}
    alt=""
    style={{ width: "40px", height: "40px" }}
/>
            <span className="d-none d-lg-inline-flex">
            𝐇𝐢 {username}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
           
          
             {/* <a href="/adminlogin" className="dropdown-item">LogOut</a>  */}
             <button onClick={handleLogout}>Logout</button>
           
          </div>
        </div>
      </div>
    </nav>
    

<ToastContainer/>

        </>
    )
}

export default NavBar
import React,{useState,useEffect} from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";
function StudentProfile(){
  const username = localStorage.getItem('username');
  const[data,setData]=useState([]);
  console.log(username)

useEffect(() => {
  fetch('http://localhost:4002/studentview').then((res) =>
    res.json()
  ).then((result) => {
  setData(result)
  console.log(result)}
  )		
}, [])

const filterdata=data.filter((value)=>value.Name===username)
console.log(filterdata,'hh')
    return(
        <>
         {/* <h1>Welcome, {username}!</h1> */}
         <div className="sidebar pe-4 pb-3">
            
            <nav className="navbar bg-light navbar-light">
                <a href="index.html" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary">📚𝐄𝐃𝐔𝐂𝐀𝐑𝐄
                    </h3>


                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        {/* <img className="rounded-circle" src="img/user.jpeg" alt="" style={{width: '40px', height: '40px'}}/> */}
                        {/* <img
              className="rounded-circle me-lg-2"
              src={filterdata[0]?.Image ? `http://localhost:4002/${filterdata[0].Image}` : "img/user.jpeg"}
              alt=""
              style={{ width: "40px", height: "40px" }}
            /> */}

{/* <img
    className="rounded-circle me-lg-2"
    src={filterdata.length > 0 ? `http://localhost:4002/${filterdata[0].Image}` : 
         (filterData.length > 0 ? `http://localhost:4002/${filterData[0].Image}` : "img/user.jpeg")}
    alt=""
    style={{ width: "40px", height: "40px" }}
/> */}

                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">{username}</h6>
                        {/* <span>Admin</span> */}
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <a href="/studenthome" className="nav-item nav-link "><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a>
                  
                    <a href="widget.html" className="nav-item nav-link"><i className="fa fa-th me-2"></i>Student Details</a>
             
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Exams
                        
                        </a>
                        <div className="dropdown-menu bg-transparent border-0">
                            
                            <a href="/examresult" className="dropdown-item">Perfomance</a>
                         
                        </div>
                        
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Question Banks
                        
                        </a>
                        {/* <div className="dropdown-menu bg-transparent border-0">
                            <a href="signin.html" className="dropdown-item">Sign In</a>
                            <a href="signup.html" className="dropdown-item">Sign Up</a>
                            <a href="404.html" className="dropdown-item">404 Error</a>
                            <a href="blank.html" className="dropdown-item">Blank Page</a>
                        </div> */}
                    </div>
                </div>
            </nav>
        </div>
        <div class="content">
          
        {/* <SideBar></SideBar> */}
        <NavBar></NavBar>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'300px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div class="container-fluid pt-4 px-4 ">
                <div class="row g-4 ">
                    
                    
                <div class="col-sm-12 col-xl-6 alert alert-primary">
                        <div class="bg-light rounded h-100 p-4">
                            <h4 class="mb-4 text-center"> Profile</h4>
                               
                                <div className="text-center">
    {filterdata.map((value, index) => (
    <img
      key={index} 
      src={value.Image} 
      alt={`Profile of ${value.Name}`}
      className="rounded-circle"
      style={{ width: '100px', height: '100px' }}
    />
  ))}
</div>
                       <table>
                        
       {filterdata.map((value,index)=>(  
        <>      
             
         <tr>

				<td>Name</td>
        <td>:{value.Name}</td>
			
			   </tr>
			<br/>
			   <tr>
				 <td>Roll No </td>
         <td>:{value.Roll}</td>
				
			</tr>
			<br/>
			<tr>
				<td>Admission No </td>
				<td>:{value.Admsn}</td>
			</tr>
     <br/>
     
      <br/>
    
      
      
      
     
      
      
 <td><Link to="/studentedit" state={{id:value._id}} style={{ marginLeft: '150px',border:'2px solid',borderRadius:'20px', marginTop:'80px',padding:'8px'}}>Edit</Link></td>
 </>   
 ))}
                        </table> 
               
                        
      
                      </div> 
                      </div> 




                </div> 

        </div> 


</div> 
        </div>  
        </>
    )
}
export default StudentProfile
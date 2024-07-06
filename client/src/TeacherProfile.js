import React,{useState,useEffect} from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";
function TeacherProfile(){
  const username = localStorage.getItem('username');
  console.log(username)
  const[data,setData]=useState([]);




useEffect(() => {
  fetch('http://localhost:4002/teacherview').then((res) =>
    res.json()
  ).then((result) => 
  setData(result)
  // console.log(result)
  )		
}, [])

const filterdata=data.filter((value)=>value.Teachername===username)
    return(
        <>
         {/* <h1>Welcome, {username}!</h1> */}
        <div class="content">
        <SideBar></SideBar>
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
      alt={`Profile of ${value.Teachername}`}
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
        <td>:{value.Teachername}</td>
			
			   </tr>
			<br/>
			   <tr>
				 <td>Subject :</td>
         <td>:{value.Subject}</td>
				
			</tr>
			<br/>
			<tr>
				<td>Email</td>
				<td>:{value.Email}</td>
			</tr>
     <br/>
      <tr>
        <td>Address</td>
        <td>:{value.Address}</td>
      </tr>
      <br/>
      <tr>
        <td>Phno</td>
        <td>:{value.Phno}</td>
      </tr>
      <br/>
    
      
      
      
     
      
      
 <td><Link to="/teacheredit" state={{id:value._id}} style={{ marginLeft: '150px',border:'2px solid',borderRadius:'20px', marginTop:'80px',padding:'8px'}}>Edit</Link></td>
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
export default TeacherProfile
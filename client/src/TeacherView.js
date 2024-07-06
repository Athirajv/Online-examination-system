import React,{useState,useEffect} from "react";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import { Link} from "react-router-dom";


function TeacherView(){
    const [data, setData] = useState([])
	const [refresh, setRefresh] = useState(0)

	useEffect(() => {
		fetch('http://localhost:4002/teacherview').then((res) =>
			res.json()
		).then((result) => 
		setData(result)
        
		// console.log(result)
		)		
	}, [refresh])
    
    const handleDelete = (iD)=>{
		let params = {
			id:iD
		}
		fetch('http://localhost:4002/teacherdelete',{
			method:'post',
			headers:{
				Accept :'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setRefresh((previous)=>previous+1)
		})
	}
	
    return(


	
        <>
      <div class="content">

        <NavBar></NavBar>
        <SideBar/>

       
		<div style={{ display: 'flex', flexDirection: 'column', marginLeft:'40px', alignItems: 'center', justifyContent: 'center', minHeight: '10vh', padding: '20px' }}>
        <div class="col-sm-12 col-xl-14">

                        <div class="bg-light rounded h-100 p-4 col-md-12">
                            <h6 class="mb-4 text-center "><u>TEACHER'S DETAILS</u></h6>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                      
                                        <th scope="col-3">Teachername</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phno</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Image</th>
                                        <th colSpan={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value,index)=>{
                                        
                                        return(
                                            <>
                                            <tr>
                                           
                                           
                                            
                                            <td>{value.Teachername}</td>
                                            <td>{value.Subject}</td>
                                            <td>{value.Email}</td>
                                            <td>{value.Phno}</td>
                                            <td>{value.Address}</td>
                                            <td><img src={value.Image} alt="
                                            " width="100" height="100" /></td>
                                            
                                
                                        <td><button class="btn btn-info m-2"style={{ color: '#222',marginLeft:'150px' }}onClick={() => handleDelete(value._id)}>Delete</button></td>
                                       
                                        </tr>
                                   
                                        </>
                                        
                                        )
                                    })}
                                  
                                </tbody>
                            </table>
                            <Link to="/addteacher"  style={{ marginLeft: '150px',border:'2px solid',borderRadius:'20px', marginTop:'80px',padding:'8px'}}>Add Teacher</Link>
                       
                       
                    </div>
                   
                   
                    </div>
                   
                    </div>
      </div>
        </>
    )
}
export default TeacherView
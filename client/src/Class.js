import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
function Class(){

    const [data, setData] = useState([])
	const [refresh, setRefresh] = useState(0)

	useEffect(() => {
		fetch('http://localhost:4002/studentview').then((res) =>
			res.json()
		).then((result) => 
		setData(result)
		// console.log(result)
		)		
	}, [refresh])


    const handleDelete = (iD) => {
        let params = {
          id: iD,
        };
        fetch("http://localhost:4002/studdelete", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })
          .then((res) => res.json())
          .then((result) => {
            setRefresh((previous) => previous + 1);
          });
      };
    
    return(
        <>
         <div class="content">
       <SideBar></SideBar>
       <NavBar></NavBar>
       <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'50px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
       <div class="col-sm-12 col-xl-14">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">CLASS 1</h6>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                      
                                        <th scope="col">STUDENTS</th>
                                        <th scope="col">ROLL NO</th>
                                        <th scope="col">ACTION</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value,index)=>{
                                        
                                        return(
                                            <>
                                            <tr>
                                           
                                          
                                            
                                            <td>{value.Name}</td>
                                            <td>{value.Roll}</td>
                                            <td>
                                        <button class="btn btn-primary m-2"onClick={() => handleDelete(value._id)}>Delete</button></td>
                                        </tr>
                                   
                                        </>
                                        
                                        )
                                    })}
                                  
                                </tbody>
                            </table>
                        </div>
                       
                    </div>
                   
                    <Link to="/addstudent"  style={{ marginLeft: '20px',border:'2px solid',borderRadius:'20px',padding:'8px'}}>ADD STUDENT</Link>
                    
                    
                    </div>
                   
                </div>   
        </>
    )
}
export default Class
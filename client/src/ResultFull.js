import React ,{useState,useEffect}from 'react'
import SideBar from './Sidebar'
import NavBar from './Navbar'

function ResultFull() {
    const [data, setData] = useState([])
	const [refresh, setRefresh] = useState(0)

	useEffect(() => {
		fetch('http://localhost:4002/answerview').then((res) =>
			res.json()
		).then((result) => 
		setData(result)
		// console.log(result)
		)		
	}, [refresh])
  return (
    <div>
        <div class="content">
            <SideBar/>
            <NavBar/>
      
                           
     <h3 class="mb-4 text-center "><u>STUDENT'S MARKS</u></h3>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                      
                                        <th scope="col-3">STUDENTS</th>
                                        <th scope="col">MARKS</th>
                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value,index)=>{
                                        
                                        return(
                                            <>
                                            <tr>
                                           
                                         
                                            
                                            <td>{value.username}</td>
                                            <td>{value.marks}</td>
                                           
                                            
                                            
                                        
                                      
                                       
                                       
                                        </tr>
                                   
                                        </>
                                        
                                        )
                                    })}
                                  
                                </tbody>
                            </table>
                           
                            </div>
    </div>
  )
}

export default ResultFull;



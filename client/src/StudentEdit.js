import React, { useState,useEffect } from "react";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import { useNavigate ,useLocation} from "react-router-dom";
function StudentEdit(){
    const [name, setName] = useState('')
    const [rollno, setRollno] = useState('')
    const [admsnno, setAdmsnno] = useState('')
    const[image,setImage]=useState('')
    const location= useLocation();
    const navigate = useNavigate()
    const [imageView, setImageView] = useState("");

    useEffect(()=>{
        let params = {
            id:location.state.id
        }
        fetch('http://localhost:4002/studentedit',{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(params)
        }).then((res)=>res.json()).then((result)=>{
            console.log(result);
            setName(result.Name)
            setAdmsnno(result.Admsn)
            setRollno(result.Roll)
            setImage(result.Image)
            setImageView(result.Image);
            
            
        })
        
      },[])

      const handleUpdate = (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('id',location.state.id)
        formdata.append('name',name);
        formdata.append('rollno',rollno);
        formdata.append('admsnno',admsnno)

        formdata.append('image',image);
        
        fetch("http://localhost:4002/studentupdate", {
          method: "post",
          body: formdata,
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            navigate('/studentprofile')
          });
      };
    return(
        <>
     <div class="content">
            <NavBar/>
            <SideBar/>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'300px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div class="container-fluid pt-4 px-4 ">
                <div class="row g-4 ">
                    
                    
                <div class="col-sm-12 col-xl-6 alert alert-primary">
                        <div class="bg-light rounded h-100 p-4">
                            <h4 class="mb-4 text-center"> Profile</h4>
   
                        
                <form action="" method="post" onSubmit={handleUpdate}>
                
              
                <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label"> Name</label>
                  <input type="text"  name='name'className="form-control" onChange={(e)=>setName(e.target.value)} value={name}id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Rollno</label>
                  <input type="text" name='rollno'className="form-control"onChange={(e)=>setRollno(e.target.value)} value={rollno} id="exampleInputtext" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Admission no</label>
                  <input type="text" name='admsno'className="form-control" onChange={(e)=>setAdmsnno(e.target.value)} value={admsnno}id="exampleInputtext" />
                </div>
               
               
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Image</label>
                  <input type="file" name='image'className="form-control" onChange={(e)=>{setImage(e.target.files[0]);setImageView(URL.createObjectURL(e.target.files[0]))}}id="exampleInputtext" />
  
			<img src={imageView} alt="Hii" width="100" height="100" />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
                
              </form>

                        </div>
                    </div>




                </div>

        </div>


</div>

                               
            </div>
        </>
    )
}
export default StudentEdit
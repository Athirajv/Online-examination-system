import React ,{useState,useEffect}from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
function AddStudent(){
const [name,setName]=useState('');
const [roll,setRoll]=useState('');
const [admsn,setAdmsn]=useState('');
const[image,setImage]=useState('');
const [data,setData]=useState([])

const username = localStorage.getItem('username');

useEffect(() => {
  fetch('http://localhost:4002/studentview').then((res) =>
    res.json()
  ).then((result) => 
  setData(result)
  // console.log(result)
  )		
}, []);
const filterdata=data.filter((value)=>value.
   Teachername===username)
   console.log(filterdata)
const handleSubmit=(e)=>{
    e.preventDefault();	
    let formData = new FormData();
    formData.append('name', name);
    formData.append('roll', roll);
    formData.append('admsn', admsn);
    formData.append('image',image)

    fetch('http://localhost:4002/addstudent', {
        method: 'POST',
        body: formData
    })
    .then((res) => res.json())
    .then((result) => {
        window.location.reload();
    });
}


    return(
        <>
         <div class="content">
            <SideBar></SideBar>
            <NavBar></NavBar>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '20px' }}>
    <h3>Student details</h3>
    <form method="post" onSubmit={handleSubmit} style={{ width: '360px', textAlign: 'left', border: '2px solid ', padding: '20px' }}>

            <label className="form-label" style={{ display: "inline-block",width: "100px" }}>Name</label>
            <input type="text" name="name" className="form-control"onChange={(e) => setName(e.target.value)}/> <br /><br />

            <label style={{ display: "inline-block",width: "100px" }}>Rollnumber</label>
            <input type="text" name="roll" className="form-control"onChange={(e) => setRoll(e.target.value)}/> <br /><br />

            <label style={{ display: "inline-block",width: "100px" }}>Admission No</label>
            <input type="text" name="admsn"className="form-control" onChange={(e) => setAdmsn(e.target.value)} /> <br /><br />
            <label style={{ display: "inline-block",width: "100px" }}>Image</label>
            <input type="file" name="image"className="form-control" onChange={(e) => setImage(e.target.files[0])} /> <br /><br />
           
            <button type="submit" class="btn btn-info m-2"style={{ color: '#222',marginLeft:'150px' }}>Submit</button><br />
          
        </form>

        </div>
         </div>
        </>
    )
}
export default AddStudent;
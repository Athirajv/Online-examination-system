import React , { useState }from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
function AddTeacher(){
  const [teachername, setTeachername] = useState('')
  const [subject, setSubject] = useState('')
  const [email,setEmail] = useState('')
  const [phno,setPhno]=useState('')
  const [address,setAddress]=useState('')
  const [image,setImage]=useState('');



const handleSubmit = (e)=>{
    e.preventDefault()
   
    let formData = new FormData();
    formData.append('teachername', teachername);
    formData.append('image', image);
    formData.append('subject', subject);
    formData.append('email',email);
    formData.append('phno',phno);
    formData.append('address',address)
  

    fetch('http://localhost:4002/addteacher', {
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
      <h3 className="text-center text-primary"style={{textDecoration:'underline'}}>TEACHER'S DETAILS</h3>

      <div className="container-fluid pt-4 d-flex align-items-center justify-content-center">
        <div className="row g-4">
          <div className="text-center">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Form</h6>
              <form action="" method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Teacher's Name</label>
                  <input type="text"  name='teachername'className="form-control" onChange={(e)=>setTeachername(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Subject</label>
                  <input type="text" name='subject'className="form-control" onChange={(e)=>setSubject(e.target.value)}id="exampleInputtext" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Email</label>
                  <input type="text" name='email'className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Ph No</label>
                  <input type="text" name='phno'className="form-control" onChange={(e)=>setPhno(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Address</label>
                  <input type="text" name='address'className="form-control" onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Image</label>
                  <input type="file" name='image'className="form-control" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>

    )
}
export default AddTeacher
import React,{useState,useEffect} from "react";
import NavBar from "./Navbar";import { useNavigate ,useLocation} from "react-router-dom";
function TeacherEdit(){
  const [teachername, setTeachername] = useState('')
  const [subject, setSubject] = useState('')
  const [email,setEmail] = useState('')
  const [phno,setPhno]=useState('')
  const [address,setAddress]=useState('')
  const [image,setImage]=useState('');
  const location= useLocation();
  const navigate = useNavigate()
  const [imageView, setImageView] = useState("");




  useEffect(()=>{
    let params = {
        id:location.state.id
    }
    fetch('http://localhost:4002/teacheredit',{
        method:'post',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
      console.log(result)
        
        setTeachername(result.Teachername)
        setEmail(result.Email)
        setAddress(result.Address)
        setPhno(result.Phno)
        setSubject(result.Subject)
        setImage(result.Image)
        setImageView(result.Image);
        
        
    })
    
  },[])

  
  const handleUpdate = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append('id',location.state.id)
    formdata.append('teachername',teachername);
    formdata.append('subject',subject);
    formdata.append('address',address);
    formdata.append('email',email);
    formdata.append('image',image);
    formdata.append('phno',phno);
    fetch("http://localhost:4002/teacherupdate", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigate('/teacherprofile')
      });
  };

    return(
        <>
        <div class="content">
            <NavBar></NavBar>
            {/* <SideBar/> */}
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'300px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div class="container-fluid pt-4 px-4 ">
                <div class="row g-4 ">
                    
                    
                <div class="col-sm-12 col-xl-6 alert alert-primary">
                        <div class="bg-light rounded h-100 p-4">
                            <h4 class="mb-4 text-center"> Profile</h4>
   
                        
                <form action="" method="post" onSubmit={handleUpdate}>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label"> Name</label>
                  <input type="text"  name='teachername'className="form-control" onChange={(e)=>setTeachername(e.target.value)} value={teachername}id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Email</label>
                  <input type="email" name='emai'className="form-control"onChange={(e)=>setEmail(e.target.value)} value={email} id="exampleInputtext" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Subject</label>
                  <input type="text" name='subject'className="form-control" onChange={(e)=>setSubject(e.target.value)} value={subject}id="exampleInputtext" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Phone no</label>
                  <input type="text" name='phno'className="form-control" onChange={(e)=>setPhno(e.target.value)} value={phno}id="exampleInputtext" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Address</label>
                  <input type="text" name='address'className="form-control" onChange={(e)=>setAddress(e.target.value)}value={address} id="exampleInputtext" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext" className="form-label">Image</label>
                  <input type="file" name='image'className="form-control" onChange={(e)=>{setImage(e.target.files[0]);setImageView(URL.createObjectURL(e.target.files[0]))}}id="exampleInputtext" />
                  {/* setImageView(URL.createObjectURL(e.target.files[0]));}} */}
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
export default TeacherEdit
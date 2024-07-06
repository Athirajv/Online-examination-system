import React ,{useState,useEffect}from "react";


function SideBar(){
    const username = localStorage.getItem('username');
    const [data,setData]=useState([])

    useEffect(() => {
      fetch('http://localhost:4002/teacherview').then((res) =>
        res.json()
      ).then((result) => 
      setData(result)
      // console.log(result)
      )		
    }, []);
     const filterdata=data.filter((value)=>value.
     Teachername===username)
    //  console.log(filterdata)

    useEffect(() => {
        fetch('http://localhost:4002/studentview').then((res) =>
          res.json()
        ).then((result) => {
        setData(result)
        // console.log(result)
    }
        )		
      }, [])
      
      const filterData=data.filter((value)=>value.Name===username)
    return(
        <>
       
          <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <a href="index.html" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary">📚𝐄𝐃𝐔𝐂𝐀𝐑𝐄
                    </h3>


                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
            

<img
    className="rounded-circle me-lg-2"
    src={filterdata.length > 0 ? `http://localhost:4002/${filterdata[0].Image}` : 
         (filterData.length > 0 ? `http://localhost:4002/${filterData[0].Image}` : "img/user.jpeg")}
    alt=""
    style={{ width: "40px", height: "40px" }}
/>

                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">{username}</h6>
                        
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <a href="/teacherhome" className="nav-item nav-link "><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a>
               
                    <a href="/class" className=
                    "nav-item nav-link"><i className="fa fa-th me-2"></i>Student Details</a>
        
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Exams
                        
                        </a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <a href="/addexam" className="dropdown-item">Add Exam</a>
                            <a href="/resultfull" className="dropdown-item">Perfomance</a>
                         
                        </div>
                        
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i> Perfomance
                        
                        </a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <a href="/resultfull" className="dropdown-item">Exam Result</a>
                         
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        
        </>
    )
}

export default SideBar
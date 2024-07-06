import React from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
function AdminHome(){
    const containerStyle = {
        backgroundImage: `url(img/hd.avif)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };
    return(
        <>
       
        <div class="content">
        <SideBar/>
        <NavBar/>
        <div className="container-fluid" style={containerStyle}>
        <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-4 alert alert-primary">
                        <div class="bg-light rounded h-100 p-4">
                            
                            <h6 class="mb-4"> <a href="/teacherview" className="dropdown-item"><h6>TEACHERS</h6></a></h6>
                            
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-4 alert alert-secondary ">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4"><a href="/studentexam">
                                <h6>EXAMS</h6></a></h6>
                         
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-4  alert alert-warning">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4"><a href="/studentview" className="dropdown-item"><h6>STUDENTS</h6></a></h6>
                         
                        </div>
                    </div>





                </div>

        </div>

</div>
        
        </div>
       
        </>
    )
}

export default AdminHome
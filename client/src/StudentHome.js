


import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";

function StudentHome() {
  const username = localStorage.getItem("username");
  const [data, setData] = useState([]);
  const [activeExams, setActiveExams] = useState([]);


  const [completedExams, setCompletedExams] = useState([]);

  const [upcomingExams, setUpcomingExams] = useState([]);
  const [noActiveExams, setNoActiveExams] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4002/api/examview/')
      .then((res) => res.json())
      .then((result) => {
        const currentDate = new Date();
        const filteredUpcomingExams = result.filter((exam) => {
          const examStartDateTime = new Date(`${exam.scheduledDate} ${exam.scheduledstartTime}`);
          return currentDate < examStartDateTime;
        });

        setUpcomingExams(filteredUpcomingExams);
        setNoActiveExams(filteredUpcomingExams.length === 0);
      });
  }, []);
  
  useEffect(() => {
   
    fetch('http://localhost:4002/api/examview/')
      .then((res) => res.json())
      .then((result) => {
       
        const currentDate = new Date();

        const filteredCompletedExams = result.filter((exam) => {
          const examEndDateTime = new Date(`${exam.scheduledDate} ${exam.scheduledendTime}`);

          return currentDate > examEndDateTime;
        });

        setCompletedExams(filteredCompletedExams);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:4002/api/examview/')
      .then((res) => res.json())
      .then((result) => {
        const currentDate = new Date();
        const filteredActiveExams = result.filter((exam) => {
          const examStartDateTime = new Date(`${exam.scheduledDate} ${exam.scheduledstartTime}`);
          const examEndDateTime = new Date(`${exam.scheduledDate} ${exam.scheduledendTime}`);

          return currentDate >= examStartDateTime && currentDate <= examEndDateTime;
        });

        setActiveExams(filteredActiveExams);
        setNoActiveExams(filteredActiveExams.length === 0);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4002/studentview")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  const filterdata = data.filter((value) => value.Name === username);
  const containerStyle = {
    backgroundImage: `url(img/hd.avif)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '50vh',
};
  return (
    <>
      <NavBar />
      <div className="container-fluid" style={containerStyle}>
      < div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 alert alert-primary">
            <div className="bg-light rounded h-100 p-4 text-center">
              <h4 className="mb-4">Profile</h4>
              <img
                className="rounded-circle me-lg-2"
                src={






                  filterdata[0]?.Image
                    ? `http://localhost:4002/${filterdata[0].Image}`
                    : "img/user.jpeg"
                }
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <br />
              <p className="text-center">Name: {username}</p>


              
              <p className="text-center">Subject: Maths</p>
              <a href="/studentprofile" className="stretched-link"></a>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-3 alert alert-secondary">
            <div className="bg-light rounded h-100 p-4 text-center">
              <h6 className="mb-4">
                <a href="/studentexam"className="stretched-link">
                  <h6>EXAMS</h6>
                </a>
              </h6>
            </div>
          </div>
          <div className="col-md-3 alert alert-secondary">
            <div className="bg-light rounded h-100 p-4 text-center">
              <h6 className="mb-4">
              <a href="/examresult"className="stretched-link">
                <h6>PERFOMANCE</h6>
                </a>
              </h6>
            </div>
          </div>
        </div>

        <div className="col-md-12 alert alert-success mt-4">
          <div className="bg-light rounded h-100 p-3">
            <h4 className="mb-4 text-center">My Classes</h4>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="col-md-3 alert alert-danger m-3">
                <div className="bg-light rounded h-100 p-3">
                  <a href="/activeexam" className="stretched-link">
                    
                     <h6 class="mb-4 text-center"  >
                            <div style={{ display: 'inline-block', position: 'relative' }}>
                            ACTIVE EXAMS
                                {activeExams.length > 0 && (
                                    <div style={{ position: 'absolute', top: '-1px', left: '106%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
                                        {activeExams.length}
                                    </div>
                                )}
                            </div>
                        </h6>
                  </a>
                </div>
              </div>
              <div className="col-md-3 alert alert-danger m-3">
                <div className="bg-light rounded h-100 p-3">
                  <a href="/completedexams" className="stretched-link">
                  
                    <h6 class="mb-4 text-center"  >
                            <div style={{ display: 'inline-block', position: 'relative' }}>
                            PREVIOUS EXAMS
                                {completedExams.length > 0 && (
                                    <div style={{ position: 'absolute', top: '-1px', left: '106%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
                                        {completedExams.length}
                                    </div>
                                )}
                            </div>
                        </h6>

                  </a>
                </div>
              </div>
              <div className="col-md-3 alert alert-danger m-3">
                <div className="bg-light rounded h-100 p-3">
                  <a href="/upcomingexams" className="stretched-link">
                    {/* <p>UPCOMING EXAMS</p> */}
                     <h6 class="mb-4 text-center"  >
                            <div style={{ display: 'inline-block', position: 'relative' }}>
                            UPCOMING EXAMS
                                {upcomingExams.length > 0 && (
                                    <div style={{ position: 'absolute', top: '-1px', left: '106%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'15px' }}>
                                        {upcomingExams.length}
                                    </div>
                                )}
                            </div>
                        </h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default StudentHome;





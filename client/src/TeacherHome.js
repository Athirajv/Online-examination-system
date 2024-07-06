





import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";

function TeacherHome() {
  const username = localStorage.getItem('username');
  const [data, setData] = useState([]);
  const [activeExams, setActiveExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [noActiveExams, setNoActiveExams] = useState(false);

  const [classes, setClasses] = useState(() => {
    const storedClasses = localStorage.getItem('classes');
    return storedClasses ? JSON.parse(storedClasses) : ["Class1"];
  });

  const addClass = () => {
    const newClass = `Class${classes.length + 1}`;
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  const deleteClass = (index) => {
    const updatedClasses = [...classes];
    updatedClasses.splice(index, 1);
    setClasses(updatedClasses);
  };

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

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

  const filterdata = data.filter((value) => value.Teachername === username);

  return (
    <>
      <div className="content">
        <SideBar />
        <NavBar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-6 alert alert-primary
            ">
              <div className="bg-light rounded h-100 p-4">
                <h4 className="mb-4 text-center">𝐏𝐑𝐎𝐅𝐈𝐋𝐄</h4>
                <div className="text-center">
                  <img
                    className="rounded-circle me-lg-2"
                    src={filterdata[0]?.Image ? `http://localhost:4002/${filterdata[0].Image}` : "img/user.jpeg"}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
                <br></br>
                <p className="text-center">Name:{username}</p>
                <p className="text-center">Subject:Maths</p>
                <a href="/teacherprofile" className="stretched-link"> </a>
              </div>
            </div>
           
<div className="col-sm-12 col-xl-6 alert alert-secondary">
  <div className="bg-light rounded h-100 p-4">
    <div className="bg-light
     rounded h-100 p-3">
      <h4 className="mb-4 text-center">My Exams</h4>
      <div className="row">
        {/* Active Exams */}
        <div className="col-md-4 alert alert-danger m-3">
          <div className="bg-light rounded h-100 p-3">
            <a href="/activeexam" className="stretched-link">
              <h6 className="mb-4 text-center">
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  ACTIVE EXAMS
                  {activeExams.length > 0 && (
                    <div style={{ position: 'absolute', top: '-1px', left: '106%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
                      {activeExams.length}
                    </div>
                  )}
                </div>
              </h6>
            </a>
          </div>
        </div>

        {/* Previous Exams */}

        <div className="col-md-4 alert alert-danger m-3">
          <div className="bg-light rounded h-100 p-3">
            <a href="/completedexams" className="stretched-link">
              <h6 className="mb-4 text-center">
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  PREVIOUS EXAMS
                  {completedExams.length > 0 && (
                    <div style={{ position: 'absolute', top: '-1px', left: '106%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
                      {completedExams.length}
                    </div>
                  )}
                </div>
              </h6>
            </a>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="col-md-4 alert alert-danger m-3">
          <div className="bg-light rounded h-100 p-3">
            <a href="/upcomingexams" className="stretched-link">
              <h6 className="mb-4 text-center">
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  UPCOMING EXAMS
                  {upcomingExams.length > 0 && (
                    <div style={{ position: 'absolute', top: '-1px', left: '106%', transform: 'translate(-50%, -50%)', borderRadius: '50%', width: '18px', height: '18px', backgroundColor: 'red', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
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

            <div className="col-sm-12 col-xl-12 alert alert-success">
              <div className="bg-light rounded h-100 p-3">
                <span
                  className="add-class-symbol"
                  style={{ border: '2px solid green', borderRadius: '150px', marginTop: '80px', padding: '8px'}}

                  onClick={addClass}
                >

                  
                  Add Class
                </span>
                <h4 className="mb-4 text-center"> My Classes</h4>
                <div className="d-flex flex-wrap">
                  {classes.map((className, index) => (
                    <div key={index} className="col-sm-12 col-xl-3 alert alert-danger mr-3">
                      <div className="bg-light rounded h-100 p-3">
                        <a href={'/class'} className="">
                          <p>{className}</p> </a>
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => deleteClass(index)}
                        >
                          Delete
                        </button>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-xl-12 alert alert-info">
              <div className="bg-light rounded h-100 p-3">
                <h4 className="mb-4 text-center"> Exams</h4>
                <div className="col-sm-12 col-xl-3 alert alert-dark">
                  <div className="bg-light rounded h-100 p-3">
                    <a href="/addexam" className="stretched-link"><h6>AddExam</h6></a>
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

export default TeacherHome;

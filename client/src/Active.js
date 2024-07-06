
import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";


function StudentActive() {
  const [activeExams, setActiveExams] = useState([]);
  const [noActiveExams, setNoActiveExams] = useState(false);
  const navigate = useNavigate();

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

  const handleStartActiveExam = (examId) => {

    navigate('/examtest', { state: { examId } });
  };
  const containerStyle = {
    backgroundImage: `url(img/pencil.avif)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  return (
    <>
      <NavBar />
      <div className="container-fluid" style={containerStyle}>
      <div className="container mt-4">
        <h4 className="mb-4 text-center"><u>Active Exams</u></h4>
        {noActiveExams ? (
          <p className="text-center"> <div class="alert alert-danger" role="alert">
          No active exams at the moment.
           </div></p>
      
        ) : (
          <table className="table table-bordered table table-hover alert alert-danger">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Exam Date</th>
                <th>Questions</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
           

           
              {activeExams.map((exam) => (
                
               <tr key={exam._id}>
                  <td>{exam.title}</td>
                  <td>{exam.scheduledDate}</td>
                  <td>
                <button style={{ marginLeft: '20px', borderRadius: '20px' }}> 👁️‍🗨️</button>
                </td>
                  <td>{exam.scheduledstartTime}</td>
                  <td>{exam.scheduledendTime}</td>
                  <td><button   className="btn btn-success m-2"onClick={() => handleStartActiveExam(exam._id)}>Start</button></td>
                
                </tr>
               
              ))}
              
            </tbody>
          </table>  
        )}
      </div>
      </div>
    </>
  );
}

export default StudentActive;



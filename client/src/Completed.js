import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";

import { Link } from "react-router-dom";

function Studentcompleted() {
  const [completedExams, setCompletedExams] = useState([]);
console.log(completedExams)
  useEffect(() => {
  
    fetch('http://localhost:4002/api/examview')
      .then((res) => res.json())
      .then((result) => {
       
        const currentDate = new Date();

        const filteredCompletedExams = result.filter((exam) => {
          const examEndDateTime = new Date(`${exam.scheduledDate} ${exam.scheduledendTime}`);

          return currentDate > examEndDateTime;
        });

        setCompletedExams(filteredCompletedExams);
      });
  }, [completedExams]);
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
        <h4 className="mb-4 text-center"><u>Completed Exams</u></h4>
        <table className="table table-bordered  table table-hover alert alert-danger">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Exam Date</th>
              <th>Start Time</th>
              <th>End Time</th>
             
             
            </tr>
          </thead>
          <tbody>
            {completedExams.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.title}</td>
                <td>{exam.scheduledDate}</td>
                <td>{exam.scheduledstartTime}</td>
                <td>{exam.scheduledendTime}</td>
               
         
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default Studentcompleted;



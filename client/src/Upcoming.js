
import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";

function StudentUpcoming() {
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
        <h4 className="mb-4 text-center"><u>Upcoming Exams 
          </u></h4>
        {noActiveExams ? (
          <p className="text-center"> <div class="alert alert-danger" role="alert">
          No upcoming exams at the moment.
           </div></p>
      
        ) : (
          <table className="table table-bordered table table-hover alert alert-danger">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Exam Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {upcomingExams.map((exam) => (
                <tr key={exam._id}>
                  <td>{exam.title}</td>
                  <td>{exam.scheduledDate}</td>
                  <td>{exam.scheduledstartTime}</td>
                  <td>{exam.scheduledendTime}</td>
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

export default StudentUpcoming;

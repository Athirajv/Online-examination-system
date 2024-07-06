import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import ExamTest from "./ExamTest";

const StudentExam = () => {
  const [examData, setExamData] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4002/api/examview/`)
      .then((response) => response.json())
      .then((data) => {
        setExamData(data);
        console.log("Fetched Exam Data:", data);
      })
      .catch((error) => console.error("Error fetching exam data:", error));
  }, []);

  const handleStartExam = (index) => {
    const selectedExam = examData[index];
    const currentTime = new Date();
    console.log(selectedExam)
    const startTime = new Date(`${selectedExam.scheduledDate}T${selectedExam.scheduledstartTime}`);
    const endTime = new Date(`${selectedExam.scheduledDate}T${selectedExam.scheduledendTime}`);

    if (currentTime >= startTime && currentTime <= endTime) {
      setSelectedExam(selectedExam);
      setIsScheduling(true);
     
      
      navigate('/examtest', { state: { examId: selectedExam._id } });
    } else {
      alert("The exam has not started yet or has already ended.");
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h1 className="text-center">ᴇxᴀᴍ ᴅᴇᴛᴀɪʟꜱ</h1>
        <table border="1" className="table table-hover">
         
          <thead>
            <tr>
              <th>Class</th>
              <th>Title</th>
              <th>Questions</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((item, index) => (
              <tr key={index}>
                <td>{item.class}</td>
                <td>{item.title}</td>
                <td>
                 
                  <button style={{ marginLeft: '20px', borderRadius: '20px' }}> 👁️‍🗨️</button>
                </td>
                <td>{item.scheduledDate}</td>
                <td>{item.scheduledstartTime}</td>
                <td>{item.scheduledendTime}</td>
                <td>
                  <button
                    className="btn btn-success m-2"
                    onClick={() => handleStartExam(index)}
                  >
                    START
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isScheduling && (
        <ExamTest
          title={selectedExam.title}
          class={selectedExam.class}
          questions={selectedExam.questions}
        />
      )}
    </>
  );
};

export default StudentExam;

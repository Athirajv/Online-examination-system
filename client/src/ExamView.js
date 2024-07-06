



import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";




const ExamView = () => {
  const [examData, setExamData] = useState([]);
  const [scheduleExamData, setScheduleExamData] = useState({
    class: "",
    title: "",
    scheduledDate: "",
    scheduledstartTime: "",
    scheduledendTime: "",
  });
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:4002/api/examview/`)
      .then((response) => response.json())
      .then((data) => {
        setExamData(data);
        console.log("Fetched Exam Data:", data);
      })
      .catch((error) => console.error("Error fetching exam data:", error));
  }, []);

  const handleScheduleExam = (index) => {
    const selectedExam = examData[index];
    setSelectedExam(selectedExam);
    setScheduleExamData({
      class: selectedExam.class,
      title: selectedExam.title,
      scheduledDate: "",
      scheduledstartTime: "",
      scheduledendTime: "",
    });
    setIsScheduling(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();

    const { class: examClass, title, scheduledDate, scheduledstartTime, scheduledendTime } = scheduleExamData;

    fetch(`http://localhost:4002/api/scheduleexam/${selectedExam._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scheduledDate,
        scheduledstartTime,
        scheduledendTime,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => console.error("Error scheduling exam:", error));

    setScheduleExamData({
      class: "",
      title: "",
      scheduledDate: "",
      scheduledstartTime: "",
      scheduledendTime: "",
    });

    setIsScheduling(false);
  };

  return (
    <div className="content">
      <NavBar />
      <SideBar />
      <div>
        <h1 className="text-center">ᴇxᴀᴍ ᴅᴇᴛᴀɪʟꜱ</h1>
        <table border="1" className="table table-hover">
          <thead>
            <tr>
              <th>Class</th>
              <th>Title</th>
              <th>Questions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((item, index) => (
              <tr key={index}>
                <td>{item.class}</td>
                <td>{item.title}</td>
                <td>
                  <ul>
                    {item.questions.map((question, qIndex) => (
                      <li key={qIndex}>{question.text}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {/* <button style={{ marginLeft: '20px', borderRadius: '20px' }}> 👁️‍🗨️</button> */}
                </td>
                <td>
                  <button className="btn btn-info m-2" onClick={() => handleScheduleExam(index)}>
                    Schedule Exam
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isScheduling && (
          // <div>
          //   <h2 className="text-center mb-4
<div>\


<h2 className="text-center mb-4">SCHEDULE EXAM</h2>
<form onSubmit={handleScheduleSubmit}>
  {/* <div className="form-group">
    <label>Class:</label>
    <input type="text" value={scheduleExamData.class} className="form-control" disabled />
  </div>
  <div className="form-group">
    <label>Title:</label>
    <input type="text" value={scheduleExamData.title} className="form-control" disabled />
  </div> */}
  <div className="form-group">
    <label>Scheduled Date:</label>
    <input
      type="date"
      value={scheduleExamData.scheduledDate}
      onChange={(e) => setScheduleExamData({ ...scheduleExamData, scheduledDate: e.target.value })}
      className="form-control"
      required
    />
  </div>
  <div className="form-group">
    <label>Start Time:</label>
    <input
      type="time"
      value={scheduleExamData.scheduledstartTime}
      onChange={(e) => setScheduleExamData({ ...scheduleExamData, scheduledstartTime: e.target.value })}
      className="form-control"
      required
    />
  </div>
  <div className="form-group">

    <label>End Time:</label>

    <input
      type="time"
      value={scheduleExamData.scheduledendTime}
      onChange={(e) => setScheduleExamData({ ...scheduleExamData, scheduledendTime: e.target.value })}
      className="form-control"
      required
    />
  </div>
  <button type="submit" className="btn btn-primary">Schedule</button>
</form>
</div>
)}
</div>
</div>
);
};

export default ExamView;


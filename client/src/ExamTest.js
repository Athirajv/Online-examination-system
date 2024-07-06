


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

function ExamTest() {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [classs, setClasss] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array.from({ length: 2 }, () => ""));
  const [scheduledStartTime, setScheduledStartTime] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledEndTime, setScheduledEndTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const username = localStorage.getItem("username");
  const navigate=useNavigate('')
  

  useEffect(() => {
    let params = {
      id: location.state.examId,
    };

    fetch("http://localhost:4002/examtest", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setClasss(result.class);
        setQuestions(result.questions);
        setScheduledDate(result.scheduledDate);
        setScheduledStartTime(result.scheduledstartTime);
        setScheduledEndTime(result.scheduledendTime);
        calculateRemainingTime(result.scheduledstartTime, result.scheduledendTime);
      });
  }, [location.state.examId]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      calculateRemainingTime(scheduledEndTime);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [scheduledEndTime]);

  const calculateRemainingTime = (endTime) => {
    const currentTime = new Date();
    const endDateTime = new Date(`${new Date().toDateString()} ${endTime}`);

    const remainingSeconds = Math.max(0, Math.floor((endDateTime - currentTime) / 1000));
    setRemainingTime(remainingSeconds);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const questionAnswers = questions.map((question, index) => ({
      id: question.id,
      text: question.text,
      userAnswer: answers[index],
      correctAnswer: question.answer,
    }));

    const params = {
      examId: location.state.examId,
      username: username,
      answers: questionAnswers,
      scheduledDate: scheduledDate,
      scheduledStartTime: scheduledStartTime,
      scheduledEndTime: scheduledEndTime,
    };

    fetch("http://localhost:4002/submitanswers", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
     
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
      });
      // window.location.reload();
      navigate('/examresult')
  };

  return (
    <>
      <NavBar />
      <h1 className="text-center">EXAM</h1>
      <div className="timer">Remaining Time: {formatTime(remainingTime)}</div>
      <form action="" method="post">
        <div className="mb-3">
          <div className="mb-3">
            <p className="text-center">Name: {username}</p>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" name="title" className="form-control" value={title} disabled />
          </div>
          <div className="mb-3">
            <label htmlFor="class" className="form-label">
              Class
            </label>
            <input type="text" name="class" className="form-control" value={classs} disabled />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Questions</label>
          {questions.map((question, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={`question${index + 1}`} className="form-label">
                {`Question ${index + 1}`}
              </label>
              <input
                type="text"
                name={`question${index + 1}`}
                className="form-control"
                value={question.text}
                disabled
              />
              <label htmlFor={`answer${index + 1}`} className="form-label">
                {`Answer ${index + 1}`}
              </label>
              <input
                type="text"
                name={`answer${index + 1}`}
                className="form-control"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-danger m-2" type="button" onClick={handleSubmit}>
          Submit
        </button>
        
      </form>
    </>
  );
}

export default ExamTest;

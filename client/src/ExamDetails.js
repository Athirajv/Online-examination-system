

import React, { useState } from "react";
import SideBar from "./Sidebar";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const AddExam = () => {
  const [questions, setQuestions] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [examDetails, setExamDetails] = useState({
    title: "",
    class: "",
  });
  const [answers, setAnswers] = useState({});

  const handleInputChange = (e) => {
    setExamDetails({
      ...examDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnswerChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...examDetails,
      questions: questions.map((question) => ({
        id: question.id,
        text: document.getElementById(`question${question.id}`).value,
        answer: answers[question.id] || "",
      })),
    };

    try {
      const response = await fetch("http://localhost:4002/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Exam created successfully");
      } else {
        console.error("Failed to create exam");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questionCounter }]);
    setQuestionCounter(questionCounter + 1);
  };

  return (
    <>
      <div className="content">
        <SideBar />
        <NavBar />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '300px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
          <div className="container-fluid pt-4 px-4 ">
            <div className="row g-4 ">
              <div className="col-sm-12 col-xl-6 alert alert-primary">
                <div className="bg-light rounded h-100 p-4">
                  <h4 className="mb-4 text-center">Exam Details</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title:</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="class" className="form-label">Class:</label>
                      <input
                        type="text"
                        name="class"
                        className="form-control"
                        id="class"
                        aria-describedby="classHelp"
                        onChange={handleInputChange}
                      />
                    </div>
                    {questions.map((question) => (
                      <div key={question.id} className="mb-3">
                        <label htmlFor={`question${question.id}`} className="form-label">
                          Question {question.id}:
                        </label>
                        <input
                          type="text"
                          name={`question${question.id}`}
                          className="form-control"
                          id={`question${question.id}`}
                          aria-describedby="questionHelp"
                        />
                        <input
                          type="text"
                          name={`answer${question.id}`}
                          className="form-control"
                          id={`answer${question.id}`}
                          placeholder="Default Answer"
                          onChange={(e) => handleAnswerChange(e, question.id)}
                        />
                      </div>
                    ))}
                    <button type="button" className="btn btn-dark" onClick={handleAddQuestion}>+ Add Question</button>
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "30px" }}>Create</button>
                    <Link to="/examview">View</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExam;

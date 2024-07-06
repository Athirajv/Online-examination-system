

import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";

function ExamResult() {
  const [marks, setMarks] = useState(0);
  const username = localStorage.getItem("username");

  useEffect(() => {
  
    fetch("http://localhost:4002/getmarks", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }), 
    })
      .then((res) => res.json())
      .then((result) => {
        setMarks(result.totalMarks); 
      })
      .catch((error) => {
        console.error("Error fetching marks:", error);
      });
  }, [username]);

  return (
    <>
    <div className="content">
    <NavBar/>
    <SideBar/>
    
       <h1 className="text-center">Exam Result</h1>
       <form method="post"  style={{ width: '360px', textAlign: 'left', border: '2px solid ', padding: '20px' }}>

<label className="form-label" style={{ display: "inline-block",width: "100px" }}>Name</label>
<input type="text" name="name" className="form-control" value={username}/> <br /><br />

<label style={{ display: "inline-block",width: "100px" }}>Marks</label>
<input type="text" name="roll" className="form-control" value={marks}/> <br /><br />




</form>
</div>

    </>
  );
}

export default ExamResult;

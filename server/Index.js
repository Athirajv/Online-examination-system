var express= require('express')
const app= express()
var bodyParser = require('body-parser')
var cors = require('cors')
var mongo = require('mongodb')
var dbase = require("./Database")
var imageUpload= require('express-fileupload')
var path=require('path')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(imageUpload())
const session = require('express-session');


app.use(
    session({
      secret: 'athira',
      resave: false,
      saveUninitialized: true,
    })
  );
  
app.use(express.static(path.join(__dirname, 'public')));
app.post('/addteacher',(req,res)=>{
    let details={
        Teachername:req.body.teachername,
        Subject:req.body.subject,
        Email:req.body.email,
        Phno:req.body.phno,
        Address:req.body.address,
        Image:req.files.image.name
      
    }
    dbase.then((db)=>{
        db.collection('teachers_details').insertOne(details).then((result)=>{
            // res.json(result)
            const fileupload=req.files.image
            fileupload.mv("public/" + details.Image).then((data)=>{
                res.json({success:true})
                // console.log(details)
            })
        })
    })
})

app.get('/teacherview', (req, res) => {
	dbase.then((db) => {
		db.collection("teachers_details").find({}).toArray().then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})
app.post('/teacherdelete', (req, res) => {
	let delete_id = req.body.id;
	dbase.then((db) => {
		db.collection('teachers_details').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})
app.post('/teacheredit',(req,res)=>{
    let edit_id =req.body.id;
    dbase.then((db)=>{
        db.collection('teachers_details').findOne({_id: new mongo.ObjectId(edit_id)}).then((result)=>{
            res.json(result)
        })
    })
})
app.post('/teacherupdate',(req,res)=>{
    let upd_id=req.body.id;
    let details={
        Teachername:req.body.teachername,
        Subject:req.body.subject,
        Email:req.body.email,
        Phno:req.body.phno,
        Address:req.body.address,
        Image:req.files?.image.name
    }
    let neweditdata='';
    if(req.files?.image){
        neweditdata={
        
        Teachername:details.Teachername,
        Subject:details.Subject,
        Email:details.Email,
        Phno:details.Phno,
        Address:details.Address,
        Image:details.Image

           
        }
        let newdata=req.files.image;
        newdata.mv('public/' + details.Image)
    }
    else{
        neweditdata={
            Teachername:details.Teachername,
            Subject:details.Subject,
            Email:details.Email,
            Phno:details.Phno,
            Address:details.Address
        }
    }
    dbase.then((db)=>{
        db.collection('teachers_details').updateOne({_id:new mongo.ObjectId(upd_id)},{$set:neweditdata}).then((result)=>{
            res.json('updated')
        })
    })
})

app.post('/register',(req,res)=>{
    let details={
        Username:req.body.username,
        Email:req.body.email,
        Password:req.body.password,
        userstatus:1
      
    }
    dbase.then((db)=>{
        db.collection('register_details').insertOne(details).then((result)=>{
            res.json(result)
        })
    })
})



app.post('/', async (req, res) => {
    try {
    let details = {
        Email: req.body.email,
        Password: req.body.password
    };

    
    
        const db = await dbase;
        const user = await db.collection('register_details').findOne({ Email: details.Email });

        if (user) {
       
        //  if(details.Password === user.Password){

         
        if (user.userstatus == 0) {
            res.json({ success: true, redirect: '/adminhome',username: user.Username });
        } else if (user.userstatus == 1) {
            res.json({ success: true, redirect: '/teacherhome',username: user.Username });
        } else if (user.userstatus == 2) {
            res.json({ success: true, redirect: '/studenthome',username: user.Username });
        } else {
            res.json({ success: false, message: 'Invalid user status' });
        }
    // }
        
    } else {
       
        res.json({ success: false, message: 'Invalid email or password' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
   
});

//add student

app.post('/addstudent',(req,res)=>{
    
    let details={
       Name:req.body.name,
       Roll:req.body.roll,
       Admsn:req.body.admsn,
       Image:req.files.image.name

      
    }
    dbase.then((db)=>{
        db.collection('student_details').insertOne(details).then((result)=>{
            const fileupload=req.files.image
            fileupload.mv("public/" + details.Image).then((data)=>{
                // res.json({success:true})
                // console.log(details)
            })
            res.json(result)

        })
    })
})

app.get('/studentview', (req, res) => {
	dbase.then((db) => {
		db.collection("student_details").find({}).toArray().then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})


app.post('/studentedit',(req,res)=>{
    let edit_id =req.body.id;
    dbase.then((db)=>{
        db.collection('student_details').findOne({_id: new mongo.ObjectId(edit_id)}).then((result)=>{
            res.json(result)
            // console.log(result)
        })
    })
})

app.post('/studentupdate',(req,res)=>{
    let upd_id=req.body.id;
    let details={
        Name:req.body.name,
        Roll:req.body.rollno,
        Admsn:req.body.admsnno,
        Image:req.files?.image.name
    }
    let neweditdata='';
    if(req.files?.image){
        neweditdata={
        
        Name:details.Name,
        Roll:details.Roll,
        Admsn:details.Admsn,
        Image:details.Image

           
        }
        let newdata=req.files.image;
        newdata.mv('public/' + details.Image)
    }
    else{
        neweditdata={
            Name:details.Name,
            Roll:details.Roll,
            Admsn:details.Admsn
            
        }
    }
    dbase.then((db)=>{
        db.collection('student_details').updateOne({_id:new mongo.ObjectId(upd_id)},{$set:neweditdata}).then((result)=>{
            res.json('updated')
        })
    })
})
//delete

app.post('/studentdelete',(req,res)=>{
    let delete_id=req.body.id;
    dbase.then((db)=>{
        db.collection('student_details').deleteOne({_id:new mongo.ObjectId(delete_id)}).then((result)=>{
            res.json(result)
        })
    })
})
app.post("/api/exams", async (req, res) => {
    try {
      const { title, class: examClass, questions } = req.body;

      
      const db= await dbase;
      const examsCollection = db.collection("exam_details");

     
      await examsCollection.insertOne({
        title,
        class: examClass,
        questions,
      });

      res.status(201).json({ message: "Exam created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



  
  
app.get('/api/examview', (req, res) => {
	dbase.then((db) => {
		db.collection("exam_details").find({}).toArray().then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})
app.post('/api/scheduleexam/:id', express.json(), (req, res) => {
    const examId = req.params.id;
    const { scheduledDate, scheduledstartTime, scheduledendTime } = req.body;
  
    dbase.then((db) => {
      db.collection("exam_details").updateOne(
        { _id:new mongo. ObjectId(examId) },
        {
          $set: {
            scheduledDate: scheduledDate,
            scheduledstartTime: scheduledstartTime,
            scheduledendTime: scheduledendTime,
          },
        }
      )
      .then(() => {
        res.json({ message: "Exam scheduled successfully!" });
      })
      .catch((error) => {
        console.error("Error scheduling exam:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
    });
  });

  app.post('/examtest',(req,res)=>{
    let edit_id =req.body.id;
    dbase.then((db)=>{
        db.collection('exam_details').findOne({_id: new mongo.ObjectId(edit_id)}).then((result)=>{
            res.json(result)
        })
    })
})
  
app.post('/previousexam',(req,res)=>{
    let edit_id =req.body.id;
    dbase.then((db)=>{
        db.collection('answer_details').findOne({_id: new mongo.ObjectId(edit_id)}).then((result)=>{
            res.json(result)
            // console.log(result)
        })
    })
})

//answers

// app.post("/storeanswers", (req, res) => {
//     const { examId, answers,scheduledDate,scheduledstartTime,scheduledendTime,username } = req.body;
  

// let answerDetails = {
//     examId,
//     username, // Add username here
//     answers,
//     scheduledDate,
//     scheduledstartTime,
//     scheduledendTime
//   };
  
//   dbase.then((db) => {
//     db.collection("answer_details").insertOne(answerDetails)
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((error) => {
//         console.error("Error storing answers:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//       });
//   });
  
// })

// app.post("/submitanswers", async (req, res) => {
//     const { examId, username, answers ,scheduledDate,scheduledstartTime,scheduledendTime} = req.body;
  
//     try {
//     //   const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
//     //   const db = client.db("your-database-name"); // Replace with your database name
//     const db=await dbase;
//     const answerDetailsCollection = db.collection("answer_details"); // Replace with your collection name

//     // Assuming examDetails and answers are available in your database
//     const examDetails = await db.collection("exam_details").findOne({_id: new mongo.ObjectId(examId)})

//     if (!examDetails || !examDetails.questions) {
//       throw new Error("Invalid exam details or questions not found");
//     }

//     // Compare answers and calculate marks
//     let totalMarks = 0;
//     answers.forEach((userAnswer) => {
//       const correctAnswer = examDetails.questions.find((q) => q.id === userAnswer.id)?.answer;
//       if (userAnswer.userAnswer === correctAnswer) {
//         totalMarks += 1;
//       }
//     });

//     // Save marks to answer_details collection
//     await answerDetailsCollection.insertOne({
//       examId,
//       username,
//       answers,
//       marks: totalMarks,
//       scheduledDate,
//       scheduledstartTime,
//       scheduledendTime
//     });

//     // client.close();
//     res.json({ message: "Answers submitted successfully." });
//   } catch (error) {
//     console.error("Error submitting answers:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


app.post("/submitanswers", async (req, res) => {
    const { examId, username, answers, scheduledDate, scheduledStartTime, scheduledEndTime } = req.body;
  
    try {
      const db = await dbase;
      const answerDetailsCollection = db.collection("answer_details");
  
      const examDetails = await db.collection("exam_details").findOne({ _id: new mongo.ObjectId(examId) });
  
      if (!examDetails || !examDetails.questions) {
        throw new Error("Invalid exam details or questions not found");
      }
  
      let totalMarks = 0;
      answers.forEach((userAnswer) => {
        const correctAnswer = examDetails.questions.find((q) => q.id === userAnswer.id)?.answer;
        if (userAnswer.userAnswer === correctAnswer) {
          totalMarks += 1;
        }
      });
  
      await answerDetailsCollection.insertOne({
        examId,
        username,
        answers,
        marks: totalMarks,
        scheduledDate,
        scheduledStartTime,
        scheduledEndTime,
      });
  // Inside the /submitanswers endpoint
res.json({ message: "Answers submitted successfully.", totalMarks });

    //   res.json({ message: "Answers submitted successfully." });
    } catch (error) {
      console.error("Error submitting answers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get('/answerview', (req, res) => {
	dbase.then((db) => {
		db.collection("answer_details").find({}).toArray().then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})
// app.post('/getmarks', async (req, res) => {
//     let edit_id =req.body.id;
//     dbase.then((db)=>{
//         db.collection('answer_details').findOne({_id: new mongo.ObjectId(edit_id)}).then((result)=>{
//             res.json(result)
//         })
//     })
// })
  
app.post("/getmarks", async (req, res) => {
    const { username } = req.body;
    const db = await dbase;
    try {
      const answerDetailsCollection = db.collection("answer_details");
  
      const userMarks = await answerDetailsCollection.findOne({ username });
  
      if (!userMarks) {
        throw new Error("Marks not found for the provided username");
      }
  
      res.json({ totalMarks: userMarks.marks });
    } catch (error) {
      console.error("Error fetching marks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(4002)





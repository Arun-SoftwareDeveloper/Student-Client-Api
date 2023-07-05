const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const dbUrl = "mongodb://0.0.0.0:27017/MentorStudent";


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected!!!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/",(req,res) =>{
  res.send("Hello!!!");
})
 
app.use(express.json());

const Mentor =require ("./Models/Mentor")
app.post("/mentors",async(req,res) =>{
  try{
    const{name,email,description} = req.body;
    const newMentor = new Mentor(
      {
        name,
        email,
        description
      }
    )
    const saveMentor = await newMentor.save();
    res.status(200).send(saveMentor);
  }
  catch(error){
    res.status(400).send("Error Occurred!!!"+error);
  }
  // res.send("Mentor posted Successfully!!!");

})
app.get("/getmentors", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).send(mentors);
  } catch (error) {
    res.status(500).send("Error occurred while fetching mentors: " + error);
  }
});



const Student =require ("./Models/Student")
app.post("/students",async(req,res) =>{
  try{
    const{name,email,grade} = req.body;
    const newStudent = new Student(
      {
        name,
        email,
        grade
      }
    )
    const saveStudent = await newStudent.save();
    res.status(200).send(saveStudent);
  }
  catch(error){
    res.status(400).send("Error Occurred!!!"+error);
  }
  // res.send("Mentor posted Successfully!!!");

})

app.get("/getstudents",async(req,res) =>{
  try{
    const students = await Student.find();
    res.status(200).send(students);
  }
  catch(err){
    res.status(400).send("Error Occurred!!!"+err)
  }
})

app.post("/mentors/:mentorId/students", async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const studentId = req.body.studentId; // Assuming the request body contains the studentId

    // Check if the mentor exists in the database
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Check if the student exists in the database
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Assign the student to the mentor
     mentor.students= []
    mentor.students.push(studentId);
    await mentor.save();

    res.status(200).json({ message: "Student assigned to mentor successfully" });
  } catch (error) {
    console.error("Error assigning student to mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000,() =>{
  console.log("The port was running!!!")
})
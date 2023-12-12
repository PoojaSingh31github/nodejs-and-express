// Creating my entry point:- Typically, this is an server.js file. This is where my application starts.I can set up my server, import necessary modules, and will define initial configurations here.

const express = require("express");
const Storage = require("node-persist");

Storage.init();
const app = express();

app.use(express.json());

app.post("/addStudent", async (req, res) => {
  try {
    const { id, name, gpa } = req.body;
    await Storage.setItem(id, { id, name, gpa });
    res.send("Student added");
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/allstudents", async (req, res) => {
  try {
    const students = await Storage.values();
    const data = `
    <style>
      h1{
        color:red;
      }
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }
      table{
        border: 2px solid gray;
        padding: 5px;
        background-color:pink;
      }
      .container{
        align-item:center;
        justify-content:center;
        display:flex;
      }
      th{
        border: 2px solid gray;
        padding: 5px;

      }
      td{
        border: 2px solid gray;
        padding: 5px;
      }
  </style>
        <h1>All Students</h1>
         <hr>
        ${students
          .map(
            (student) => `
            <div class = "container">
            <table>
  <tr>
    <th>Student ID</th>
    <th>Student Name</th>
    <th>CGPA</th>
  </tr>
  <tr>
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.gpa}</td>
  </tr>
</table>
</div>
`).join(" <br> ")}
    `;
    res.send(data);
  } catch (err) {
    console.error("Error:", err);
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const students = await Storage.values();
    const student = students.find((student) => student.id === req.params.id);

    if (student) {
      const data = `
      <style>
      h1{
        color:red;
      }
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }
      table{
        border: 2px solid gray;
        padding: 5px;
        background-color:pink;
      }
      .container{
        align-item:center;
        justify-content:center;
        display:flex;
      }
      th{
        border: 2px solid gray;
        padding: 5px;

      }
      td{
        border: 2px solid gray;
        padding: 5px;
      }
  </style>
        
          <h1>Student Detail</h1>
          <hr>
          <div class = "container">
          <table>
  <tr>
    <th>Student ID</th>
    <th>Student Name</th>
    <th>CGPA</th>
  </tr>
  <tr>
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.gpa}</td>
  </tr>
</table>
</div>
      `;
      res.send(data);
    } else {
      res.status(404).send("Student not found");
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/findToppers", async (req, res) => {
  try {
    const students = await Storage.values();
    const gpas = students.map((item) => item.gpa);
    console.log(gpas);
    const highGPA = Math.max(...gpas);
    console.log(highGPA);
    const toppers = students.filter((student) => student.gpa === highGPA);
    const data = `
      ${toppers
        .map(
          (student) => `
          <style>
      h1{
        color:red;
      }
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }
      table{
        border: 2px solid gray;
        padding: 5px;
        background-color:pink;
      }
      .container{
        align-item:center;
        justify-content:center;
        display:flex;
      }
      th{
        border: 2px solid gray;
        padding: 5px;

      }
      td{
        border: 2px solid gray;
        padding: 5px;
      }
  </style>
  <h1>Student Detail</h1>
  <hr>
  <div class = "container">
  <table>
<tr>
<th>Student ID</th>
<th>Student Name</th>
<th>CGPA</th>
</tr>
<tr>
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.gpa}</td>
</tr>
</table>
</div>
        `
        )
        .join("<br>")}
    `;
    res.send(data);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => console.log("Server started"));
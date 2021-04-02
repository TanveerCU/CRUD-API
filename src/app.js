const express = require('express');
require("./db/conn")
const app = express();
const cors = require('cors');
const Student = require('./models/students');
const port = process.env.PORT || 3000;
app.use(express.json());
const apiRouter = require('./API/api.js');
app.use('/api',apiRouter);



app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
    });


// create new student
app.post('/student',async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(404).send(e);
    }
});


// show students data
app.get('/student',cors(),async(req,res)=>{
    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(e){
        res.send(e);
    }
});


// show students data by id
app.get('/student/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id,{_id:0});
        if(!studentData){
            res.send("no such data exist");
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.send("no such data exist");
    }
});



// update students data
app.patch('/student/:id',async (req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{new:true});
        res.status(200).send(updateStudent);
       
    }catch(e){
        res.status(404).send("page not found")
    }
});



// Delete students data
app.delete('/student/:id',async (req,res)=>{
    try{
        const deteleStudent = await Student.findByIdAndDelete(req.params.id);
        res.status(200).send(deteleStudent);
       
    }catch(e){
        res.status(404).send("page not found")
    }
});



app.listen(port,()=>{
    console.log("server connect successfully");
});
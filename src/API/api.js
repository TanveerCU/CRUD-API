const express = require('express');
const cors =require('cors');
const Student = require('../models/students');
const router = express.Router();

router.get('/student',cors(),async(req,res)=>{
    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(e){
        res.send(e);
    }
});

module.exports = router;
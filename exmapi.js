const express=require('express');
const students=require('./students.js');
const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hai welcome to api");
})
app.get('/api/students',(req,res)=>{
    res.json(students);
})
app.get('/api/students/:id',(req,res)=>{
    const stu=students.find(c=>c.id===parseInt(req.params.id));
    if(!stu)
    res.status(400).send('The student with the given id was not found');
    res.send(stu);
});
app.listen(3000,(req,res)=>
{
    console.log("running at 3000");
})
app.post('/api/students',(req,res)=>{
    const stu={
        id:students.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    };
    students.push(stu);
    res.send(stu);
});
app.put('/api/students/:id',(req,res)=>{
    const stu=students.find(c=>c.id===parseInt(req.params.id));
    if(!stu)     
    res.status(400).send("the student with given id is not available");
    
    stu.first_name=req.body.first_name;
    stu.last_name=req.body.last_name;
    stu.email=req.body.email;
     res.json(stu);

})
app.delete('/api/students/:id',(req,res)=>{
    const stu=students.find(c=>c.id===parseInt(req.params.id));
    if(!stu)
    res.status(400).send("no such student id ");
    const index=students.indexOf(stu);
    students.splice(index,1);
    res.send(stu);
});
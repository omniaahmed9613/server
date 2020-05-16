//requiring all necessary packages.
const express=require('express');
const dotenv=require('dotenv').config();
const path=require('path');
const app=express();
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
const mongoose=require('mongoose');
const cors=require('cors');
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(err)=>{
    if(err)throw err;
    console.log(`MongoDB connected...`);
})
const PORT=process.env.PORT || 5000;
app.use(cors({credentials:true, origin:"http://localhost:8080"}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
app.use(express.json());
app.use(cookieparser());
app.use('/account',require('./routes/account'));
app.use('/user_images',express.static(path.resolve(__dirname,'user_images')));
app.get('/check-token',async(req,res)=>{
const token=req.cookies.Authorization;
try{
const validate=jwt.verify(token,process.env.TOKEN_SECRET);
res.sendStatus(200);
}
catch(err){
res.sendStatus(404);
}
});
app.get('/delete-token',async(req,res)=>{
    res.clearCookie('Authorization').sendStatus(200);
})
app.listen(PORT,()=>{
    console.log(`Server Started on port 5000...`);
})
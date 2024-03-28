const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
let store = {valid:false};

router.get('/',(req,res)=>{
    res.send("user route");
})

router.post('/dashboard',async (req,res)=>{
    try{
        if(store){
            res.json(store);
        }
        else{
            store.valid = false;
            res.json(store);
        }
    }
    catch(err){
        res.json({message:err});
    }
})

router.post('/login', (req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(password, user.password)){
                store.valid = true;
                store.email = user.email;
                store.role = user.role;
                store.id = user.id;
                store.name = user.name;
                // store.save();
                // console.log("hoise")
                // console.log(store)
                return res.json(store);
            }
            else{
                // console.log("vul password")
                res.json("The password is incorrect")
            }
        }
        else{
            // console.log("user nai")
            res.json("email is not registered");
        }
    })
})

router.post('/logout',(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        else{
            store={valid:false};
            console.log('logged out')
            res.json('Logged out')
        }
    });
})

router.post('/changePassword', (req,res)=>{
    const {email,password,newPassword} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(password, user.password)){
                const hash = bcrypt.hashSync(newPassword, 13);
                UserModel.updateOne({email:email},{password:hash})
                .then(()=>{
                    // console.log("password changed")
                    res.json("password changed")
                })
                .catch(err=>console.log(err))
            }
            else{
                // console.log("vul password")
                res.json("The password is incorrect")
            }
        }
        else{
            // console.log("user nai")
            res.json("email is not registered");
        }
    })
})

router.post('/register', (req,res)=>{
    const {role,id,name,email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user) {
            // console.log("duplicate");
            res.json("Email already exists");
        }
        else{
            const hash = bcrypt.hashSync(password, 13);
            const newStudent = new UserModel({
                role,
                id,
                name,
                email,
                password:hash
            })
            newStudent.save()
            .then(()=>{
                // console.log("registered")
                res.json("Success")
            })
            .catch(err=>console.log(err))
        }
    })
})

module.exports = router;

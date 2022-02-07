const express = require('express');
const router = new express.Router();
const User = require('../models/users');

router.post('/register', async(req, res) => {
    const user = new User(req.body);
    try{
        const result = await user.save();
        res.status(201).send(result);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/users", async(req, res) => {
    try{
        const usersData = await User.find({});
        res.send(usersData);
    }catch(e){
        res.status(500).send(e);
    }
})

router.get("/users/:id", async(req, res) => {
    const _id = req.params.id;
    try{
        const userData = await User.findById(_id);
        if(!userData){
            return res.status(404).send();
        }
        res.send(userData); //send the user data
    }catch(e){
        res.status(500).send(e);
    }
})

router.get("/phone/:phone", async(req, res) => {
    const phone = req.params.phone;
    console.log(phone);
    try{
        const userData = await User.findOne({phone:phone});
        if(!userData){
            return res.status(404).send();
        }
        res.send(userData); //send the user data
    }catch(e){
        res.status(500).send(e);
    }
})

router.patch("/users/:id", async(req, res) => {
    const _id = req.params.id;
    try{
        const updateUser = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true

        });
        res.send(updateUser);
    }catch(e){
        res.status(404).send(e);
    }
})

router.delete("/users/:id", async(req, res) => {
    const _id = req.params.id;
    try{
        const deleteUser = await User.findByIdAndDelete(_id);
        if(!deleteUser){
            return res.status(404).send();
        }
        res.send(deleteUser); //send the user data
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;
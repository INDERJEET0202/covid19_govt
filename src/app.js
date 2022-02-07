const express = require('express');
require('./db/conn');
const User = require('./models/users');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


// // create a new user
// app.post('/register', (req, res) => {
//     console.log(req.body);
//     const user = new User(req.body);

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
//     // res.send('Registering user...');
// });


// Using async await
app.post('/register', async(req, res) => {
    const user = new User(req.body);
    try{
        const result = await user.save();
        res.status(201).send(result);
    }catch(e){
        res.status(400).send(e);
    }
})

app.get("/users", async(req, res) => {
    try{
        const usersData = await User.find({});
        res.send(usersData);
    }catch(e){
        res.status(500).send(e);
    }
})

app.get("/users/:id", async(req, res) => {
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

app.get("/phone/:phone", async(req, res) => {
    const phone = req.params.phone;
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

app.patch("/users/:id", async(req, res) => {
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

app.delete("/users/:id", async(req, res) => {
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
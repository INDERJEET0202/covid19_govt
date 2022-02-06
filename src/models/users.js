const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }
    },
    phone: {
        type:Number,
        min:10,
        required: true,
        unique: [true, 'Phone number already exists'],
        // validate(value){
            // if(!validator.isMobilePhone(value)){ // ->> this is not working
        //         throw new Error('Invalid Phone Number');
        //     }
        // }
    },
    address:{
        type:String,
        required:true,
    }
})

//creating a new collection called users
const Users = mongoose.model('User', usersSchema);
module.exports = Users;
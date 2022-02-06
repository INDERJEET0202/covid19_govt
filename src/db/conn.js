const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/covid19_govt')
.then( () => {
    console.log('Connected to MongoDB');
}).catch((e) => {
    console.log('Error connecting to MongoDB: ' + e);
})
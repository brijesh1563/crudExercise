const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Exercise')
    .then(() => console.log('Connecting to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))


const courseSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true}
});

module.exports = mongoose.model('Data', courseSchema);

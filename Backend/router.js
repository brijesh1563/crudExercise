const mongoose = require('mongoose');
const router = require('express').Router();
const Data = mongoose.model('Data');

router.get('/', async (req, res) => {
    try {
        const DataToDocument = await Data.find({}) 
        res.send(DataToDocument);         
    }
    catch (error) {
        res.status(500);
    }
})
router.post('/add', async (req, res) => {
    const data = new Data({
        firstName: req.body.fname,   
        lastName: req.body.lname
    });
    await data.save(data);   
    res.send(data);         
});
router.put('/update', async (req, res) => {
    const { _id, fname, lname } = req.body;
    Data.findByIdAndUpdate(_id, { $set: { firstName: fname, lastName: lname } }, (err, result) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: "Ok"});
        }
    });
});
router.delete('/delete', async (req, res) => {
    const { _id } = req.body;
    try {
        Data.deleteOne({ _id: _id }, (err, result) => {
            if(err) {
                res.json({error: err});
            } else {
                res.json({message: "Ok"});
            }
        });
    }
    catch (error) {
        res.status(500);
    }
});
module.exports = router;

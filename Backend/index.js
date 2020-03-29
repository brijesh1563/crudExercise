const express = require('express');
const Joi = require('joi');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./connection');
const Data = require('./connection')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./FrontEnd/main'));
app.use(helmet());
app.use(morgan());
app.use('/data', require('./router'));
app.get('/', (req, res) => {
    res.sendFile('../FrontEnd/index.html', { root: __dirname }) 
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connecting on port ${port}....`));

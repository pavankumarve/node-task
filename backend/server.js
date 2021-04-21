const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

// port
mongoose.connect('mongodb://localhost:27017/usersList')
    .then(data => {
        console.log('DB Created');
    })
    .catch(error => {
        console.log(error);
    });
app.use(express.static('public'));

app.use(cors());

const Schema = mongoose.Schema;

// schema

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    password: { type: String },
});

var user = mongoose.model('SignUp', userSchema)

// post data 
router.route('/signup').post((req, res) => {
    console.log(req.body);
    const userData = new user(req.body);
    userData.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})

// get data 
router.route('/signup').get((req, res) => {
    console.log(res.body);
    userData.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})



app.use('/api', router);


app.listen(port, () => {
    console.log('Server Started');
})
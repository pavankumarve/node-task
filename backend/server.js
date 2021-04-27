const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { ExposurePlus1Sharp } = require('@material-ui/icons');
const router = express.Router();
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
const passwordService = require('./Service/password')

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
    passwordService.hash(req.body.password)
        .then((hash) => {
            req.body.password = hash;
            const userData = new user(req.body)
            userData.save()
                .then((doc) => {
                    req.json(doc);
                })
                .catch(err => {
                    res.json(err)
                     res.status(500).json(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

// get data 
router.route('/signup').get((req, res) => {
    console.log(res.body);
    
    user.find({},{password:0})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})

// ===============================================
// Delete user data 

router.route('/signup/delete').post((req, res) => {
    console.log(req.body);
    user.findOneAndRemove({ '_id': req.body._id }, { new: true, useFindAndModify: false })
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})
// ==============================

app.use('/api', router);
app.listen(port, () => {
    console.log('Server Started');
})
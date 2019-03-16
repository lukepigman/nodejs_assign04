const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Registration = mongoose.model('Registration');
const { body, validationResult } = require('express-validator/check');
router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
    });   
    
router.get('/registrations', (req, res) => {
    Registration.find()
    .then((registration) => {
    res.render('index', {title: 'Listing registrations', registration});
    })
    .catch(() => {res.send('Sorry! Something went wrong.')})
    });
        

router.post(
    '/',
    (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const registration = new Registration(req.body);
        registration.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
     } else {
        res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
        });
    }
    }
    );
        
        
                    
module.exports = router;

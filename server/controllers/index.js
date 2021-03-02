/*

    File name: index.js
    Created By: Rahul Kumar
    Student ID: 301174739
    Created on: 01 March, 2021

*/


let Feedback = require('../models/feedback')

Feedback.firstName = null;
Feedback.lastName = null;
Feedback.number = null;
Feedback.email = null;
Feedback.message = null;

// GET home page
module.exports.displayHomePage = (req, res, next) => 
{
  res.render('index', {
    title: 'Home', 
    contact:Feedback,
    displayName: req.user ? req.user.displayName : ''
  });
};


module.exports.displayAboutPage = (req, res, next) => 
{
    res.render('index', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProductsPage = (req, res, next) => 
{
    res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => 
{
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => 
{
    res.render('index', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

// POST from contact us page
module.exports.processContactInformation = (req, res, next) => {
    Feedback.firstName = req.body.userFirstName;
    Feedback.lastName = req.body.userLastName;
    Feedback.number = req.body.userContactNumber;
    Feedback.email = req.body.userEmailId;
    Feedback.message = req.body.userMessage;
    res.redirect('/home');
  };
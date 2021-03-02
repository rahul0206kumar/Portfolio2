/*

    File name: contact.js
    Created By: Rahul Kumar
    Student ID: 301174739
    Created on: 01 March, 2021

*/

let express = require('express');
let router = express.Router();

// create a reference to the model
let Contact = require('../models/contact')

/* GET router for the Contact list page */
module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, contactList) => {
      if(err){
      return console.error(err);
      }else{
           //console.log(contactList);
           if(typeof req.user == 'undefined'){    
                res.redirect('/');
           }
           else{
            res.render('contact/list', 
            {
                title: 'Contact List', 
                contactList: contactList, 
                displayName: req.user ? req.user.displayName : ''
            });
           }
      }
  }).sort({name:1});    
};

/* GET router for the ADD Contact page - CREATE */
module.exports.displayAddContact =  (req, res, next) => {
    if(typeof req.user == 'undefined'){   
        res.redirect('/');
   }
   else{
  res.render('contact/add', {title: 'Add Contact', 
  displayName: req.user ? req.user.displayName : ''});
   }
};

// POST router for the ADD Contact page  
module.exports.processContactCreation =  (req, res, next) => {
  let newContact = Contact ({
      name: req.body.name,
      number: req.body.contactNumber,
      email: req.body.emailId
  });
  Contact.create(newContact, (err) =>{
      if(err) {
          console.log(err);
          res.end(err);
      } else {
         
          res.redirect('/contact/list');
      }
  });
};

// GET router for the EDIT Contact page 
module.exports.displayEditContact =  (req, res, next) => {
  let id = req.params.id;
  Contact.findById(id, (err, contactToEdit) =>{
      if(err) {
          console.log(err);
          res.end(err);
      } else {
          // show the edit view
          if(typeof req.user == 'undefined'){    
            res.redirect('/');
       }
       else{
          res.render('contact/edit', {title: 'Edit Contact', contact:{
            _id:id,
            contactToEdit
          } , 
          displayName: req.user ? req.user.displayName : ''})
       }
       }
  });
};

// POST router for the EDIT Contact page 
module.exports.processContactUpdate = (req, res, next) => {
  let id = req.params.id;
  let updatedContact = Contact ({
      _id: id,
      name: req.body.name,
      number: req.body.contactNumber,
      email: req.body.emailId
  });

  Contact.updateOne({_id: id}, updatedContact, (err) => {
      if(err){
          console.log(err);
          res.end(err); 
      } else {
          
          res.redirect('/contact/list');
      }
  });
};


// GET router for the DELETE Contact page 
module.exports.performContactDeletion =  (req, res, next) => {
  let id = req.params.id;
  Contact.remove({_id: id}, (err) =>{
      if(err) {
          console.log(err);
          res.end(err);
      } else {
         
          if(typeof req.user == 'undefined'){    
            res.redirect('/');
       }
       else{
          res.redirect('/contact/list');
      }
    }
  });
};
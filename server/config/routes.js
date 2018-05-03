var restcontroller = require('../controller/eprestcontroller');
const express = require('express');
//const router = express.Router();

// router.get('/get', (req, res) =>  {
//   console.log('calling get');
//   restcontroller.doGet(req, res);
// });

module.exports = function(app) {
  app.get('/api/get', restcontroller.doGet);
  // app.post('/api/post', restcontroller.doPost);
};

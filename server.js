var express = require('express');

var env = process.env.NODE_ENV || 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
console.log('Starting the app in '+env+' mode');
var app = express();
var config = require('./server/config/config')[env];
require('./server/config/express')(app,config);
require('./server/config/routes')(app);

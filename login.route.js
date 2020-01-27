const express = require('express');
const route = express.Router();
const empcontroller = require('./login.controller');



route.post('/register', empcontroller.save);
route.post('/login', empcontroller.employee_login);



module.exports = route;
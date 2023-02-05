const express=require('express');

const userController = require('../src/users/userController');

const router=express.Router();
//creating routes for post for login and registration
router.post('/login',userController.loginUserControllerFn);
router.post('/createuser',userController.createUserControllerFn);
module.exports = router;
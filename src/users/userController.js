const userModel=require('./userModel');
const key='1234567890trytryrtry';

const encryptor = require('simple-encryptor')(key);
//creating usercontroller fuction for new users
const createUserControllerFn=async(req,res) => {
    try{
        console.log("hello world");
        console.log(req.body);
        //encrypting the password
        const encrypted =encryptor.encrypt(req.body.password);
        req.body.password=encrypted;
        //storing the data entered by the customer
        const status=await userModel.create(req.body);
        console.log(status);
        //cheking conditions for new users
        if(status){
            res.json({"status":true,"message":"user created successfully"});
        }
        else{
            res.send({"status":false,"message":"user creation failed"});
        }
    }
    catch(err){
        console.log(err);
    }
};
//creating fuction for login user
const loginUserControllerFn=async(req,res)=>{
    let result =null;
    try{
        console.log(req.body);
        console.log(req.body.password);
        //storing email id entered by user
        result=await userModel.findOne({email:req.body.email});
        //decrypting the password for login
        const decrypted=encryptor.decrypt(result.password);
        console.log(decrypted);
        console.log(result);
        if(req.body.password === decrypted){
            res.send({"status":true,"message":"login success"});
        }
        else{
            res.send({"status":false,"message":"user not found"});
        }
    }
    catch(err){
        console.log(err);
        res.send({"status":false,"message":"internel server error"});
    }
}

module.exports={createUserControllerFn,loginUserControllerFn};    

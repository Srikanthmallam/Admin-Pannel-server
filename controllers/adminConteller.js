const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Admin = require('../models/adminModel');
const  HttpError = require('../models/errorModel');


const register = async(req,res,next)=>{
    try {
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return next(new HttpError("fill in all the feilds",422))
        }

        const newEmail = email.toLowerCase();

        const emailExists = await Admin.findOne({email:newEmail});

        if(emailExists){
            return next(new HttpError("email already Exist",422));
        }

        if((password.trim()).length < 6){
            return next(new HttpError("password should be atleast 6 charecteres"))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt);

        const newAdmin = await Admin.create({username,email:newEmail,password:hashedPass});

        res.status(201).json(`new user ${newAdmin.email} is registered`);

    } catch (error) {
        return next(new HttpError("user registration failed",422));
    }
}



const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return next(new HttpError('please fill in all feilds',422));
        }

        const newEmail = email.toLowerCase();

        const admin = await Admin.findOne({email:newEmail});

        if(!admin){
            return next(new HttpError("invalid credentials",422));
        }

        const comparePass = await bcrypt.compare(password,admin.password)
        if(!comparePass){
            return next(new HttpError("wrong password ",422));
        }

        const {_id:id,username} = admin;

        const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"1d"});

        res.status(200).json({token,id,username});

    } catch (error) {
        return next(new HttpError("Login failed",422));
    }
}




const getAdmin = async(req,res,next) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id).select('-password');
        if (!admin) {
          return next(new HttpError("user not found", 404));
        }
        res.status(200).json({ admin });
    } catch (error) {
        return next(new HttpError(error));

    }
}

module.exports = {register,login,getAdmin};
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = await User.create({
            username:username,
            password: hashedPassword
        });
        req.session.user = newUser;
        res.status(201).json({
            status:"success",
            data:{
                newUser
            }
        });
    }catch(e){
        res.status(400).json({
            status:"fail"
        })
    }
}

exports.login = async (req, res, next) => {
    
    try{
        const {username, password} = req.body;
        const currentUser = await User.findOne({username:username});

        if(!currentUser) return res.status(404).json({status:"fail", message:"User not found"});

        const checkPassword = await bcrypt.compare(password, currentUser.password);

        if(checkPassword){
            req.session.user = currentUser;
            res.status(200).json({
                status:"success",
                data:currentUser
            });
        }else{
            res.status(400).json({
                status:"fail",
                message:"Incorrect username or password"
            });
        }
    }catch(e){
        res.status(400).json({
            status:"fail",
            message:"Some error occurred. Please try again"
        });
    }
}
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) =>{
    try {
        const {username, email, password} = req.body;
        
        const checkExistingUser = await User.findOne({username});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }


        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        

        const createUser = new User({
            username,
            email,
            password: hashPassword
        });

        await createUser.save();

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred, please try again.'
        });
    }
}

const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Does Not Exists"
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
        }, process.env.JWT_SECRET_KEY, {expiresIn: '30m'});
        

        
        return res.status(201).json({
            success: true,
            message: "Logged In Successfully",
            data: token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred, please try again.'
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}
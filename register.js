const bcrypt = require("bcrypt");
const USERS = require("./models/users");
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Monoj123"
module.exports = async function register (req,res) {
try {
    const data = req.body

    let existing = await USERS.findOne({email:data.email})
    if(existing?._id){
        res.send({
            success:false,
            error:"Email already exists"
        })
        return
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await USERS.create({
        email: data.email,
        password: hashedPassword,
        name: data.name,
    });
    

    res.send({
        success:true,
        message:"Registration succesfull, now you can login with your email and password"
    })
} catch (error) {
    console.log("errr", error);
    res.send({
        success:false,
        error
    })
}

};


async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}
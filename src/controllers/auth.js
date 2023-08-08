import { signInValidator,signUpValidator } from "../validation/auth";
import User from "../model/User";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

dotenv.config();

export const signup = async (req,res )=>{
    try {
    // check data 
    const body = req.body
    const {error} = signUpValidator.validate(body,{abortEarly: false});
    if (error){
        const errors = error.details.map(err => err.message)
        return res.status(400).json({message: errors});

    }
    // check email 
    const userexit = await User.findOne({email: req.body.email})
    if (userexit){
        return res.status(400).json({
            message: 'Email da dang ky'
        })
    }
    // mahoa pass
    const hashpassword = await bcryptjs.hash(req.body.password,10)
    // thong bao 
    const user =await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hashpassword
    })
    console.log(user)
    user.password = undefined
    return res.status(200).json({
        message:'success'
        ,user : user
    })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
export const signin = async (req,res )=>{
    try {
    // check data 
    const body = req.body
    const {error} = signInValidator.validate(body,{abortEarly: false});
    if (error){
        const errors = error.details.map(err => err.message)
        return res.status(400).json({message: errors});

    }
    // check email 
    const userexit = await User.findOne({email: req.body.email})
    if (!userexit){
        return res.status(400).json({
            message: 'Email chua dang ky'
        })
    }
    // check pass
    const isMatch = await bcryptjs.compare(req.body.password, userexit.password)
    if (!isMatch){
        return res.status(400).json({message: 'pass sai'});
    }
//token
// const accesstoken = await jwt.signin({_id: userexit._id},'quangdeptrain',{
//     expiresIn: '1d'
// })
const accesstoken = await jwt.sign({_id: userexit._id},'quangdeptraivl',{
    expiresIn: '1d'
})
    // thong bao
    // thong bao 

    userexit.password = undefined
    return res.status(200).json({
        message:'dang nhap thah cong'
        ,userexit,
        accesstoken
    })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
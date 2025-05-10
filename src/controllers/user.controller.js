import { User } from "../models/user.model.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'


const registerUser = asyncHandler( async (req,res)=>{
     
    return res.status(200).json({mesaage:"thuis is  nfn"})

})

const login = asyncHandler((req,res)=>{

})

export {
    registerUser,

}
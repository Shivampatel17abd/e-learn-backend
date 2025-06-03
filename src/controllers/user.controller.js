import { User } from "../models/user.model.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'


const generateAccessAndRefereshTokens = async (userId) =>{

    try {

        const user = await User.findById(userId);
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return {refreshToken,accessToken};
        
    } catch (error) {
         throw new ApiError(400,"there is Error while creating the refresh ans access Token",error);
    }
}

const registerUser = asyncHandler( async (req,res)=>{
     
    const{username,fullname,email,password} = req.body;

    if(username === "" || email === "" || password === ""){
        throw new ApiError(300,"username | email | password is required");
    }

    const existeingUser = await User.findOne({
        $or:[{email},{username}]
    });


    if(existeingUser){
        throw new ApiError(409,"user with this email or username exist");
    }
    

    const user = await User.create({
        fullname:fullname||"not given",
        username:username.toLowerCase(),
        email,
        password
    })
    

    const createdUser = await User.findById(user._id).select( "-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500,"threre is some error while creating user in Db");
    }

    return res.status(201).json(new ApiResponse(200,"User registered Successfully"));
    
})

const login = asyncHandler( async (req,res)=>{
     
    const{email,password} = req.body;

     if(email === "" || password === ""){
        throw new ApiError(400,"all field are required");
     }

     const user = await User.findOne({email});

     if(!user){
        throw new ApiError(400,"No user exist with this email")
     }
     
      
     const isPasswordValid = await user.isCorrectPassword(password);
      
      console.log(isPasswordValid);

     if(!isPasswordValid){
        throw new ApiError(400,"Invalid credentials");
     }

    //    if(password !== user.password){
    //      throw new ApiError(400,"Invalid credentials");
    //    }

       const {refreshToken,accessToken} = await generateAccessAndRefereshTokens(user._id);

       const logedinUser = await User.findById(user._id).select("-password");

       const options = {
        httpOnly: true,
        secure: true
      }
    
     
      return res.status(200)
              .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", refreshToken, options)
              .json(
                new ApiResponse(200,"user successfully logedIn",logedinUser)
              )
          })


    const logoutuser = asyncHandler(async(req,res)=>{
        
        
        await User.findByIdAndUpdate(req._id,{
            $unset:{
                refreshToken:1
            },
            
        },
        {
            new:true
        }
    );

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
           .clearCookie("accessToken", options)
           .clearCookie("refreshToken", options)
           .json(
            new ApiResponse(200,"user successfully logout")
           );
    })


export {
    registerUser,
    login,
    logoutuser
}
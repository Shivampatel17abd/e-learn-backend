import { Problem } from "../models/problem.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProblem = asyncHandler(async(req,res)=>{

    const{content,isSolved,topic,diffculty,link} = req.body
    console.log(content,isSolved);

    if(!content || !topic || !diffculty || !link){
        throw new ApiError(300,"All fields required");
    }
    
    const problem = await Problem.create({
        content,
        isSolved:isSolved || false,
        topic,
        diffculty,
        link
    });

    if(!problem){
        throw new ApiError(500,"There is some Error whiling Creating Problem");
    }

    
     return res.status(200).json(
        new ApiResponse(200,"Problem added successfully",problem)
     )
})

const ToggleCompeletion = asyncHandler(async(req,res)=>{

    const{id} = req.body

    const prob = await Problem.findById(id);

    if(!prob){
        throw new ApiError(400,"there is no Problem with this id");
    }
    
    prob.isSolved = !prob.isSolved;
    
    const problem = await Problem.findById(id);
    await prob.save();

    return res.status(200).json(
        new ApiResponse(200,"problem toggle succesfull",problem)
    )
})

const problemBYDiffculty =  asyncHandler(async(req,res)=>{
  

    const{diffculty} = req.body

    if(!diffculty){
        throw new ApiError(300,"all fields are required");
    }

    const problems = await Problem.find({diffculty});

    if(!problems){
        throw new ApiError(500,"There is some error whiling get problems");
    }

    return res.status(200)
           .json(
            new ApiResponse(200,"promlem get successfully",problems)
           )
})



export{
    addProblem,
    ToggleCompeletion,
    problemBYDiffculty
}

import mongoose,{Model, Schema} from "mongoose";

const ProblemSchema = new Schema({

    content:{
        type:String,
        required:true,
    },
    isSolved:{
        type:Boolean,
        default:false
    },
    topic:{
        type:String,
        required:true
    },
    diffculty:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
});

export const Problem = new mongoose.model('Problem',ProblemSchema);


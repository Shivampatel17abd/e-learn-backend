import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },

    fullname:{
        type:String,
        minlen:[6,"fullname atleast contains 6 character"]
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    password:{
        type:String,
        required:[true,"Password is required"],
        minlen:[6,"password contains atleast 6 character"]
    },
    
    refreshToken:{
        type:String
    }

},
{
    timestamps:true
}
);

userSchema.pre('save',async function(next){
     
    if(!this.isModified(this.password)){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isCorrectPassword = async function(password){

    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        userSchema:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema);
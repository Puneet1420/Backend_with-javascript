 import mongoose , {Schema} from 'mongoose'
 import  jwt  from 'jsonwebtoken'
 import bcrypt from 'bcrypt'


 const userschema = new Schema (
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
            index: true
        },
          email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
        },
          fullname:{
            type: String,
            required: true,
            lowercase: true,
            trim : true,
            index: true
        },
        avatar:{
            type: String,    // cloudnary url
            required: true,
        },
        coverimage:{
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "VideoSchema"
            }

        ],
        password:{
            type: String,
            required: [ true , "password is required for all"],
            lowercase: true,
            trim : true,
            index: true
        },
        refreshtoken:{
            type: String,
            
        },
    },
    {timestamps: true}
    )


 userschema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
 })

 userschema.methods.isPasswordCorrect = async function (password) {
   await bcrypt.compare(password, this.password)
 }

 userschema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
 }
 userschema.methods.genrateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
 }

 export const User = mongoose.model("User" , userschema)
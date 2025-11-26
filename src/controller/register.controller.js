import userModel from "../model/user.model.js";
import { hashPassword } from "../utils/hash.password.js";
import  { generateRefreshToken, generateAccessToken } from "../utils/generate.token.js"

export async function registerUser(req, res){
    try{
        const {name, email, password, roles} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                err: true,
                success: false,
                message: "Name, email and passwrod must be required"
            })
        }

        const exist = await userModel.findOne({email})
        if(exist){
            return res.status(409).json({
                err: true,
                success: false,
                message: "Email already registered"
            })
        }

        const hashed = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            password: hashed,
            roles : roles && roles.length?roles:[roles.userModel]
        })

        await user.save();

        const accessToken = generateAccessToken({id: user._id, roles: user.roles});
        const refreshToken = generateRefreshToken({id: user._id, roles: user.roles});

        // optionally stores refreshToken in DB (hashed) for revocation
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            err: false,
            success: true,
            message: "User registered",
            user: {id: user._id, name: user.name, email: user.email, roles: user.roles},
            tokens: {accessToken, refreshToken}
        })

    } catch(err){
        return res.status(500).json({
            err: true,
            success: false,
            message: err || err.message
        })
    }
}
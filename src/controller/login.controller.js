import userModel from "../model/user.model.js";
import { comparePassword } from "../utils/compare.password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generate.token.js";

export async function loginController(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                err: true,
                success: false,
                message: "Please Provide email_id and password"
            })
        }

            const user = await userModel.findOne({email})
            if(!user){
                return res.status(401).json({
                    err: true,
                    success: false,
                    message: "Invalid credentials"
                })
            }

            const passwordComparison = await comparePassword(password, user.password);
            if(!passwordComparison){
                return res.status(401).json({
                    err: true,
                    success: false,
                    message: "Invalid Credentials"
                })
            }

            const refreshToken = generateRefreshToken({id: user._id, roles: user.roles});
            const accessToken = generateAccessToken({id: user._id, roles: user.roles});

            user.refreshToken = refreshToken;
            await user.save();

            return res.status(200).json({
                err: false,
                success: true,
                message: "Login successfully"
            })

    } catch(err){
        return res.status(500).json({
            err: true,
            success: false,
            message: err || err.message
        })
    }
}
import userModel from "../model/user.model.js";
import { generateRefreshToken } from "../utils/generate.token.js";

export async function refreshController(req, res){
    try{
        const {refreshToken} = req.body;
        if(!refreshToken){
            return res.status(400).json({
                err: true,
                success: false,
                message: "refresh token required"
            })
        }

        // verify refreshToken
        const payload = await import("jsonwebtoken").then(({default: jwt}) =>
        jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        ).catch(() => null);

        if(!payload){
            return res.status(401).json({
                err: true,
                success: false,
                message: "Invalid refresh token"
            })
        }

        const user = await userModel.findById(payload.id);
        if(!user || !user.refreshToken){
            return res.status(401).json({
                err: true,
                success: false,
                message: "Invalid token or user"
            })
        }

        // compare stored refresh token
        if(user.refreshToken !== refreshToken){
            return res.status(401).json({
                err: true,
                success: false,
                message: "Refresh token mismatch"
            })
        }

        const accessToken = generateAccessToken({id: user._id, roles: user.roles});
        const newRefreshToken = generateRefreshToken({id: user_.id, roles: user.roles})

        user.refreshToken = newRefreshToken;
        await user.save();

        return res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken
        })

    } catch (err){
        return res.status(500).json({
            err: true,
            success: false,
            message: err || err.message
        })
    }
}
import userModel from "../model/user.model.js";

export async function logout(req, res){
    try{
        const {userId} = req.body;
        if(!user){
            return res.status(400).json({
                err: true,
                success: false,
                message: "userId required"
            })
        }

        const user = userModel.findOne({userId});
        if(user){
            user,refreshToken = null;
            await user.save();
        }

        res.json({message: "logout successfully"})

    } catch(err){
        return res.status(500).json({
            err: true,
            success: false,
            message: err || err.message
        })
    }
}
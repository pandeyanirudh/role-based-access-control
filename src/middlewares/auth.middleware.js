import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';

export async function authenticate(req, res, next){
    const authHeader = req.header.authorization || req.cookies?.authorization;
    if(!authHeader){
        return res.status(400).json({
            err: true,
            success: false,
            message: "No token provided"
        })
    }
    const token = authHeader.startWith("Bearer")? authHeader.split(" ")[1] : authHeader;

    try{
        const payload = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        // attach to req
        req.user = {id: payload.id, roles: payload.roles || []};

        // optionally fetch full user
        // const user = await.userModel.findById(payload.id);
        // req.user = user;

        next();
    } catch(err){
        return res.status(401).json({message:"Invalid or expired token"})
    }
}
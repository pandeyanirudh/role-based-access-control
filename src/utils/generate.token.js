import jwt from 'jsonwebtoken';

export function generateAccessToken(payload){
    return jwt.sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN,{
        expiresIn: process.env.SECRET_KEY_ACCESS_TOKEN_EXPIRES || "30m"
    })
}

export function generateRefreshToken(payload){
    return jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN,{
        expiresIn: process.env.SECRET_KEY_REFRESH_TOKEN_EXPIRES || "7d"
    })
}
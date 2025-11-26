import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                err: true,
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            return res.status(401).json({
                err: true,
                success: false,
                message: "Token missing"
            });
        }

        const payload = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        req.user = {
            _id: payload.id,  
            roles: payload.roles || []
        };

        next();
    } catch (err) {
        return res.status(401).json({
            err: true,
            success: false,
            message: "Invalid or expired token"
        });
    }
}

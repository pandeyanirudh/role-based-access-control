export function authorizeRoles(...allowedRoles){
    // allowedRoles is array of the string like ["Admin", "Manager"]
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];

        // check for any overlap
        const has = userRoles.some(r => allowedRoles.includes(r));
        if(!has){
            return res.status(403).json({ message: "Access denied: insufficient role"});
        }
        next();
    }
}

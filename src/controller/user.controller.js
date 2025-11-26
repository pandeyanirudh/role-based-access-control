import userModel from "../model/user.model.js";

export async function getProfile(req, res) {
    const userId = req.user?._id;
    const user = await userModel.findById(userId).select("-password -refreshToken");
    if (!user) {
        return res.status(404).json({
            err: true,
            success: false,
            message: "User not found"
        })
    }
    res.json({ user });
}

export async function getAllUsers(req, res) {
    const users = await userModel.find().select("-password -refreshToken");
    res.json({ users })
}

export async function changeRoles(req, res) {
    try {
        const { userId, roles } = req.body;
        if (!userId || !roles) {
            return res.status(400).json({
                err: true,
                success: false,
                message: "UserId and roles are required"
            })
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                err: true,
                success: false,
                message: "User not found"
            })
        }
        user.roles = roles;
        await user.save();
        return res.status(200).json({
            err: false,
            success: true,
            message: "Roles updated",
            user: { id: user._id, roles: user.roles }
        })
    } catch (err) {
        return res.status(500).json({
            err: true,
            success: false,
            message: err || err.message
        })
    }
}
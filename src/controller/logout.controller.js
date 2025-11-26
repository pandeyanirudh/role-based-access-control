import userModel from "../model/user.model.js";

export async function logout(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                err: true,
                success: false,
                message: "userId is required"
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                err: true,
                success: false,
                message: "User not found"
            });
        }

        // Clear refresh token
        user.refreshToken = null;
        await user.save();

        return res.status(200).json({
            err: false,
            success: true,
            message: "Logout successful"
        });

    } catch (err) {
        return res.status(500).json({
            err: true,
            success: false,
            message: err.message || "Server error"
        });
    }
}

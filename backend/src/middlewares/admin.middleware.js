import { User } from "../models/User.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req.user;
    const user = await User.findById({ _id: id });
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
    // console.log(user);
  } catch (error) {
    next(error);
  }
};

export { adminMiddleware };

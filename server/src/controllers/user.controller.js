import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });
    if (checkUser)
      return responseHandler.badrequest(res, "username already used");

    const newUser = new userModel();

    newUser.username = username;
    newUser.displayName = displayName;
    newUser.setPassword(password);

    await newUser.save();

    const token = jwt.sign({ data: newUser.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    responseHandler.created(res, { token, ...newUser._doc, id: newUser.id });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    if (!user) return responseHandler.badrequest(res, "User not exist");

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong");

    const token = jwt.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    user.password = undefined;
    user.salt = undefined;

    const a = { token, ...user._doc, id: user.id };

    responseHandler.created(res, { token, ...user._doc, id: user.id });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorize(res);
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signin,
  signup,
  updatePassword,
  getInfo,
};

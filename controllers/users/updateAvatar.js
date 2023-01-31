const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarіDir = path.join(__dirname, "../../", "public", "avatars");

const changeAvatar = async (path) => {
  const avatar = Jimp.read(path);
  await avatar
    .resize(250, 250)
    .contain(Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
};

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarіDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    changeAvatar(avatarURL);
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../../models/index");

async function login(req, res) {
  try {
    const results = await models.User.findOne({ where: { username: req.body.username } });
    if (results.length < 1) {
      return res.status(204).send({ message: "Data Not Found" });
    }

    if (!bcrypt.compareSync(req.body.password, results.password)) {
      return res.status(400).send({ message: "Username or Password is wrong" });
    }

    // Information about users saved to payload
    const payload = {
      id: results.id,
      username: results.username,
    };
    const token = jwt.sign(payload, "secret", { expiresIn: "7d" });
    return res.send({ message: "Data is Found", data: { token: token } });
  } catch (error) {
    return res.status(204).send({ message: "Data not Found" });
  }
}

module.exports = {
  login,
};

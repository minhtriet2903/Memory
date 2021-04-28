const User = require("../models/userModel");

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

const getUserByName = (req, res) => {
  const name = req.params.name;
  if (name) {
    User.find({ name: { $regex: name } })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "This user does not exist",
          error: err.message,
        });
      });
  } else {
    User.find()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
};
const updateUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ success: true });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
      });
    });
};

module.exports = { getUserById, getUserByName, updateUser, getUsers };

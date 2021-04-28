const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate: value => {
    //     if (!validator.isEmail(value)) {
    //         throw new Error({error: 'Invalid Email address'})
    //     }
    // }
  },
  password: {
    type: String,
    required: true,
    // minLength: 6,
  },
  avatar: {
    type: String,
    default:
      "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
  },
  slogan: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  // Search for a user by email and password.
  const user = await this.findOne({ email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return user;
    }
    throw Error({ error: "Invalid login credentials" });
  }
  throw Error({ error: "Invalid login credentials" });
};
const User = mongoose.model("user", userSchema);
module.exports = User;

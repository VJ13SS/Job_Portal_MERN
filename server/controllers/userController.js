import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.js";

//to create a token for each user
const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

const registerUser = async (req, res) => {
  console.log(req.body)
  let img_filename = `${req.file.filename}`;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    //checking if user already exists in the database
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //validating the email format and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be of minimum 8 letters",
      });
    }

    //hashing or encrypting the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //adding new user to the database
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      resume: " ",
      image: img_filename,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: "Error" });
  }
};

//user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User dosent exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Password dosent Match" });
    }

    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.log(errro);
    return res.json({ success: true, message: "Error" });
  }
};

export { registerUser, loginUser };

import jwt from "jsonwebtoken";
import companyModel from "../models/company.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.token; //to get the token of the logged in user
  
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorised...Login Again",
    });
  }
  try {
    const token_decode = jwt.verify(token, "random#secret");
    req.company = await companyModel
      .findById(token_decode.id)
      .select("-password"); //remove password property from the data

    next(); //next callback function
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

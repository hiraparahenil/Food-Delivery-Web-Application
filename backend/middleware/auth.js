import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.body.userId = token_decode.id || token_decode._id;

    if (!req.body) {
      req.body = {};
    }
    
    next();
  } catch (error) {
    console.log("Auth Error:", error);
    res.json({ success: false, message: "Error authenticating token" });
  }
};

export default authMiddleware;
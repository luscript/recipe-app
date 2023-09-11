import jwt from "jsonwebtoken";

export const decodeToken = (req) => {
  const authorization = req.get("authorization");
  const token =
    authorization && authorization.toLowerCase().startsWith("bearer ")
      ? authorization.substring(7)
      : null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return null;
  }
};

import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret-token";

export const signToken = (payload: object, expiresIn = "7d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "Tracker2025";

export async function comparePassword(password: string, hash: string) {
  return jwt.verify(password, hash);
}

export function generateToken(payload: object) {
  console.log("utils", payload);
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}

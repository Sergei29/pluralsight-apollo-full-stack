import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createToken = (userInfo: Record<string, any>) =>
  JWT.sign({ sub: userInfo.id, email: userInfo.email }, process.env.SECRET!);

export const verifyPassword = (
  attemptedPassword: string,
  hashedPassword: string
) => bcrypt.compareSync(attemptedPassword, hashedPassword);

export const hashPassword = (password: string) => bcrypt.hashSync(password);

export const verifyToken = (token: string) =>
  JWT.verify(token, process.env.SECRET!);

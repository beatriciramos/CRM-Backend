import prisma from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepository from "./user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "Tracker2025";
const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || "10", 10);

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  role?: "ATTENDANT" | "SELLER" | "ADMIN";
  active: boolean;
};

type UpdateUserProps = {
  name?: string;
  email?: string;
  role?: "ATTENDANT" | "SELLER" | "ADMIN";
  active?: boolean;
};

type LoginProps = {
  email: string;
  password: string;
};

export const createUser = async (input: CreateUserProps) => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_SALT);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role || "ATTENDANT",
    },
    select: { id: true, name: true, email: true, role: true },
  });

  return user;
};

export const login = async ({ email, password }: LoginProps) => {
  console.log(1);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  console.log(2);
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error("Invalid credentials");
  console.log(3);
  const token = jwt.sign(
    { id: user.id, sub: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
  console.log(4, token);
  return {
    token,
    user: {
      id: user.id,
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const getById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};
export const list = async () => {
  const users = await userRepository.findMany();
  if (!users) throw new Error("Users not found");
  return users;
};
export const update = async (id: string, data: UpdateUserProps) => {
  const userExists = await userRepository.findUserById(id);
  if (!userExists) throw new Error("Users not found");

  return userRepository.update(id, data);
};

export const deleteUser = async (id: string) => {
  const userExists = await prisma.user.findUnique({ where: { id } });
  if (!userExists) throw new Error("Users not found");

  await prisma.user.update({
    where: { id },
    data: { active: false },
  });
};

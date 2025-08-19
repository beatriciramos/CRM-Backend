import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
type UpdateUserProps = {
  name?: string;
  email?: string;
  role?: "ATTENDANT" | "SELLER" | "ADMIN";
  active?: boolean;
};
export async function create(
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  return prisma.user.create({ data });
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export const findUserById = async (id: string) => {
  console.log(9);
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const findMany = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      active: true,
    },
  });
};
export const update = async (
  id: string,
  data: UpdateUserProps
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
    // select: { id: true, name: true, email: true, role: true, active: true },
  });
};

export const softDelete = async (id: string): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { active: false },
  });
};

export const activate = async (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { active: true },
  });
};

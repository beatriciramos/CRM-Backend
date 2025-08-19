import { PrismaClient, Customer } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data: {
  name: string;
  email: string;
  phone?: string;
  createdByUserId: string;
}) {
  return prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      createdByUserId: data.createdByUserId,
    },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });
}

export async function findMany() {
  return prisma.customer.findMany({
    include: {
      createdBy: { select: { id: true, name: true } },
      _count: {
        select: { attendances: true },
      },
      attendances: {
        include: {
          user: { select: { id: true, name: true } },
        },
      },
    },

    orderBy: { createdAt: "desc" },
  });
}

export const findActive = async () => {
  return prisma.customer.findMany({
    where: { active: true },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export async function findById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      attendances: { include: { user: { select: { id: true, name: true } } } },
      createdBy: { select: { id: true, name: true } },
    },
  });
}

export const update = async (id: string, data: Partial<Customer>) => {
  return prisma.customer.update({
    where: { id },
    data,
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });
};

export const softDelete = async (id: string) => {
  return prisma.customer.update({
    where: { id },
    data: { active: false },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });
};

export const activate = async (id: string) => {
  return prisma.customer.update({
    where: { id },
    data: { active: true },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });
};

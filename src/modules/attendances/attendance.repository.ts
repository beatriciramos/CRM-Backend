import { PrismaClient, Attendance } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data: Omit<Attendance, "id" | "createdAt">) {
  return prisma.attendance.create({
    data: {
      customerId: data.customerId,
      userId: data.userId,
      channel: data.channel,
      subject: data.subject,
      notes: data.notes ?? "",
    },
  });
}

export async function findMany() {
  return prisma.attendance.findMany({
    include: { user: true, customer: true },
  });
}

export async function update(
  id: string,
  data: Partial<Omit<Attendance, "id" | "createdAt">>
) {
  return prisma.attendance.update({
    where: { id },
    data: {
      customerId: data.customerId,
      userId: data.userId,
      channel: data.channel,
      subject: data.subject,
      notes: data.notes,
      status: data.status,
    },
    include: { user: true, customer: true },
  });
}

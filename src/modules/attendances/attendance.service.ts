import { Attendance } from "@prisma/client";
import * as attendanceRepository from "./attendance.repository";

type CreateAttendanceProps = {
  customerId: string;
  userId: string;
  channel: "CALL" | "EMAIL" | "WHATSAPP" | "MEETING" | "OTHER";
  subject: string;
  notes: string;
  status: "OPEN" | "CLOSED";
};

export async function createAttendance(data: CreateAttendanceProps) {
  console.log("data", data);
  return attendanceRepository.create(data);
}

export async function listAttendances() {
  return attendanceRepository.findMany();
}
export async function updateAttendance(
  id: string,
  data: Partial<Omit<Attendance, "id" | "createdAt">>
) {
  return attendanceRepository.update(id, data);
}

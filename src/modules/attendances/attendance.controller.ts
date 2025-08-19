import { Request, Response } from "express";
import * as attendanceService from "./attendance.service";
import { ok, created, badRequest } from "../../shared/http";
import { AuthRequest } from "../../middlewares/auth";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { customerId, channel, subject, notes } = req.body;
    console.log(req.body);
    if (!customerId || !channel || !subject) {
      return badRequest(
        res,
        "Missing required fields: customerId, channel, subject"
      );
    }
    if (!req.user) {
      return badRequest(res, "Unauthorized");
    }
    console.log("hey", req.user);
    const attendance = await attendanceService.createAttendance({
      customerId,
      notes,
      userId: req.user.sub,
      channel,
      subject,

      status: "OPEN",
    });
    console.log(attendance);
    return created(res, attendance);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const attendances = await attendanceService.listAttendances();
    return ok(res, attendances);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return badRequest(res, "Attendance ID is required");

    const updated = await attendanceService.updateAttendance(id, req.body);
    return ok(res, updated);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

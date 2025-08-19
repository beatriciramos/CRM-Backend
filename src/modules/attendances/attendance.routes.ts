import { Router } from "express";
import * as attendanceController from "./attendance.controller";
import { authenticate } from "../../middlewares/auth";

const router = Router();

router.get("/", authenticate, attendanceController.list);
router.post("/", authenticate, attendanceController.create);
router.put("/:id", authenticate, attendanceController.update);

export default router;

import { Router } from "express";
import * as customerController from "./customer.controller";
import { authenticate } from "../../middlewares/auth";

const router = Router();

router.get("/:id", authenticate, customerController.get);
router.post("/", authenticate, customerController.register);
router.get("/", authenticate, customerController.list);
router.get("/:id", authenticate, customerController.update);
router.delete("/:id", authenticate, customerController.exclude);

export default router;

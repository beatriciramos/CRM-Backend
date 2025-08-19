import { Router } from "express";
import * as userController from "./user.controller";
import { authenticate, role } from "../../middlewares/auth";

const router = Router();

router.get("/", authenticate, role(["SELLER"]), userController.list);
router.get("/me", authenticate, userController.getCurrentUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/:id", authenticate, userController.update);
router.delete("/:id", authenticate, userController.exclude);
export default router;

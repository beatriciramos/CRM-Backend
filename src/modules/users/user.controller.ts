import { Request, Response } from "express";
import * as userService from "./user.service";
import {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
} from "../../shared/http";
import { AuthRequest } from "../../middlewares/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return badRequest(res, "Missing fields");
    }
    const user = await userService.createUser({
      name,
      email,
      password,
      role,
      active: false,
    });
    return created(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  console.log(11);
  try {
    console.log(12);
    const { email, password } = req.body;
    console.log(13, req.body);
    const tokenResult = await userService.login({ email, password });
    console.log(13, tokenResult);

    return ok(res, tokenResult);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const list = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return unauthorized(res, "Unauthorized");
    if (req.user.role !== "SELLER") return forbidden(res, "Forbidden");

    const users = await userService.list();
    return ok(res, users);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Somente admin pode atualizar
    if (req.user?.role !== "SELLER") {
      return badRequest(res, "Acesso negado");
    }

    const user = await userService.update(id, { name, email, role });
    return ok(res, user);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const exclude = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Somente admin pode deletar
    if (req.user?.role !== "SELLER") {
      return badRequest(res, "Acesso negado");
    }

    await userService.deleteUser(id);
    return ok(res, "Usuário deletado com sucesso");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await userService.getById(userId);
    // res.json(user);
    console.log(user, res);
    return ok(res, user);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

import { Request, Response } from "express";
import * as customerService from "./customer.service";
import { ok, created, badRequest } from "../../shared/http";
import { AuthRequest } from "../../middlewares/auth";

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, document } = req.body;

    console.log("REQ BODY:", req.body);

    if (!name) return badRequest(res, "Missing name");
    if (!email) return badRequest(res, "Missing email");
    if (!req.user) return badRequest(res, "Unauthorized");

    const role = req.user.role || "";
    console.log("role", role);

    const customer = await customerService.createCustomer(
      {
        name,
        email,
        phone,
        document,
        createdByUserId: req.user.id,
      },
      role
    );

    console.log("customer", customer);
    return created(res, customer);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const customers = await customerService.listCustomers();
    return ok(res, customers);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const customer = await customerService.getById(id);
    if (!customer) return badRequest(res, "Cliente não encontrado");
    return ok(res, customer);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomer(
      req.params.id,
      req.body
    );
    return ok(res, customer);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const exclude = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);
    return ok(res, { message: "Customer deactivated", customer });
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

export const activate = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.activateCustomer(req.params.id);
    return ok(res, { message: "Customer activated", customer });
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

import { Request, Response } from "express";

export const ok = (res: Response, data: unknown) => res.status(200).json(data);
export const created = (res: Response, data: unknown) =>
  res.status(201).json(data);
export const noContent = (res: Response) => res.status(204).send();
export const badRequest = (res: Response, message = "Bad Request") =>
  res.status(400).json({ message });
export const unauthorized = (res: Response, message = "Unauthorized") =>
  res.status(401).json({ message });
export const forbidden = (res: Response, message = "Forbidden") =>
  res.status(403).json({ message });
export const notFound = (res: Response, message = "Not Found") =>
  res.status(404).json({ message });
export const serverError = (res: Response, message = "Internal Server Error") =>
  res.status(500).json({ message });

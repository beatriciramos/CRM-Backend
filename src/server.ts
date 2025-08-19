import express from "express";
import cors from "cors";

import userRoutes from "./modules/users/user.routes";
import customerRoutes from "./modules/customers/customer.routes";
import attendanceRoutes from "./modules/attendances/attendance.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/auth", userRoutes);
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/attendances", attendanceRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});

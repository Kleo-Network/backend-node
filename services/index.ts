import express from "express";

import { authRouter } from "./auth";
import { userRouter } from "./users";
import { organizationRouter } from "./organizations";
import { connectionRouter } from "./connections";
import { timeRouter } from "./time";
export const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRouter);
services.use("/organizations", organizationRouter);
services.use("/connections", connectionRouter);
services.use("/time", timeRouter);
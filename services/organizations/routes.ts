import express from "express";
import jwt from "express-jwt";

import { config } from "../../config";
import * as controller from "./controller";

export const organizationRouter = express.Router();


/** GET /api/organizations */
organizationRouter.route('/').get(controller.find);

/** Authenticated route: GET /api/organization */
organizationRouter.route("/organization").get(jwt(config), controller.get);

/** Authenticated route: GET /api/organizations/all */
organizationRouter.route("/all").get(jwt(config), controller.getAll);

/** POST /api/organizations */
organizationRouter.route("/").post(controller.create);



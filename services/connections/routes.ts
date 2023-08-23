import express from "express";
import jwt from "express-jwt";

import { config } from "../../config";
import * as controller from "./controller";

export const connectionRouter = express.Router();


/** GET /api/connections/user */
connectionRouter.route('/user').get(controller.findByUser);

/** GET /api/connections/org */
connectionRouter.route('/org').get(controller.findByOrg);

// /** Authenticated route */
// connectionRouter.route("/connection").get(jwt(config), controller.get);

/** POST /api/connections */
connectionRouter.route("/").post(controller.create);



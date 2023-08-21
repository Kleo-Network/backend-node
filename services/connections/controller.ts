import { NextFunction, Request, Response } from "express";
import { Connection } from "../../models/connection.model";
import { Logger } from "tslog";

const log: Logger = new Logger({ name: "errorLogger" });



export const findByUser = async (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).query.hasOwnProperty("userId")) {
		return res.status(401).send({ error: "Please send Address!" });
	}
	return res.status(200).send(await Connection.findAll({where: { userId: req.query.userId }}));
};

export const findByOrg = async (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).query.hasOwnProperty("orgId")) {
		return res.status(401).send({ error: "Please send Address!" });
	}
	return res.status(200).send(await Connection.findAll({where: { organizationId: req.query.orgId }}));
};

export const get = (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).hasOwnProperty("connection") && !(req as any).connection.hasOwnProperty("payload") && !(req as any).connection.payload.hasOwnProperty("id")) {
		return res.status(401).send({ error: "No connection found!" });
	}

	return Connection.findByPk((req as any).connection.payload.id)
		.then((connection: Connection | null) => res.json(connection))
		.catch(next);
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {userId, orgId, connectData} = req.body;
		const connectionObject = {
			userId,
			organizationId: orgId,
			connectData: connectData || {}		
		};
		const connection = await Connection.create(connectionObject);
		const result = {connection};
		return res.status(200).send(result);
	} catch (error) {
		log.error(error);
		return res.status(400);
	}
};


import { NextFunction, Request, Response } from "express";
import { Organization } from "../../models/organization.model";
import { Logger } from "tslog";

const log: Logger = new Logger({ name: "errorLogger" });

export const checkInviteCode = async (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).query.hasOwnProperty("inviteCode")) {
		return res.status(401).send({ error: "Please send invite code!" });
	}
	let orgs = await Organization.findAll({where: { inviteCode: req.query.inviteCode }});
	if(orgs.length){
		return res.status(200).send(true);
	}else {
		res.status(401).send('Please enter valid invite code!');
	}
};

export const find = async (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).query.hasOwnProperty("orgId")) {
		return res.status(401).send({ error: "Please send org id!" });
	}
	return res.status(200).send(await Organization.findAll({where: { id: req.query.orgId }}));
};

export const get = (req: Request, res: Response, next: NextFunction) => {
	if (!(req as any).hasOwnProperty("org") && !(req as any).org.hasOwnProperty("payload") && !(req as any).org.payload.hasOwnProperty("id")) {
		return res.status(401).send({ error: "No Organization found!" });
	}

	return Organization.findByPk((req as any).org.payload.id)
		.then((org: Organization | null) => res.json(org))
		.catch(next);
};

export const getAll = (req: Request, res: Response, next: NextFunction) => {

	return Organization.findAll()
		.then((orgs: Organization[] | null) => res.json(orgs))
		.catch(next);
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { intent, domainUrl, formData } = req.body;
		const inviteCode = (Math.random() + 1).toString(36).substring(7);
		const orgObject = {
			intent,
			inviteCode,
			authorized: false,
			domainUrl,
			formData
		};
		const organization = await Organization.create(orgObject);
		const result = {organization};
		return res.status(200).send(result);
	} catch (error) {
		log.error(error);
		return res.status(400).send(error);
	}
};


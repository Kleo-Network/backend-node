import { Model } from "sequelize";

export class Connection extends Model {
	public id!: number; // Note that the `null assertion` `!` is required in strict mode.
	public userId!: number;
    public organizationId!: number;
	public connectData?: JSON;
}

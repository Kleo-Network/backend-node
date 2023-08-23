import { Model } from "sequelize";

export class Organization extends Model {
	public id!: number; // Note that the `null assertion` `!` is required in strict mode.
	public keyword!: string;
	public xTimes!: number;
	public yDays!: number;
    public intent!: string;
	public domainUrl!: string;
}

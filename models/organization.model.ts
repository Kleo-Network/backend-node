import { Model } from "sequelize";

export class Organization extends Model {
	public inviteCode!: string;
	public authorized!: boolean;
	public domainUrl!: string;
	public intent!: string;
	public formData!: FormData[];
}

export interface FormData {
	header: string;
	 default: boolean;
	 subMenu: SubMenu[];
}

export interface SubMenu {
	 index: string;
	 times: number;
	 days: number;
     default: boolean;
	 state: ConnectStates;
}

export enum ConnectStates {
    SELECTED = 'selected',
    DISABLED = 'disabled',
    DESELECTED = 'deselected'
  }

import os from "os";
import path from "path";
import { INTEGER, NUMBER, Sequelize, STRING, ENUM, JSON } from "sequelize";

import { User, Time, Appointment, Organization, Connection } from "./models";

const sequelize = new Sequelize("kleo", "", undefined, {
	dialect: "sqlite",
	storage: path.join("db/temp.sqlite"),
	logging: true
});

export enum Status {
	available = "available",
	pending="pending",
	confirmed="confirmed",
	unavailable="unavailable",
  }
    

// Initialize all models.
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
			defaultValue: (): number => Math.floor(Math.random() * 10000) // Initialize with a random nonce
		},
		publicAddress: {
			// polygon public address of the user
			allowNull: false,
			type: STRING,
			unique: true,
			validate: { isLowercase: true }
		},
		username: {
			type: STRING, // user defined username
			unique: true
		}
	},
	{
		modelName: "user",
		sequelize, // This bit is important
		timestamps: true
	}
);

Time.init(
	{
		user: {
			allowNull: true,
			type: INTEGER.UNSIGNED // SQLITE will use INTEGER
		},
		status: {
			allowNull: false,
			type: STRING,
			defaultValue: "unavailable" // Initialize with a unavailable status
		},
		timeStart: {
			type: NUMBER // start time the user is available in epoch
		},
		timeEnd: {
			type: NUMBER // end time the user is available in epoch
		},
		secret: {
			type: STRING
		}
	},
	{
		modelName: "time",
		sequelize, // This bit is important
		timestamps: true
	}
);

Appointment.init(
	{
		fromUser: {
			allowNull: true,
			type: NUMBER // SQLITE will use INTEGER
		},
		toUser: {
			allowNull: true,
			type: NUMBER
		},
		secret: {
			type: STRING
		},
		status: {
			type: ENUM,
			values: [Status.available, Status.unavailable, Status.pending, Status.confirmed]
		},
		slot: {
			type: STRING,
			allowNull: true,
		}
	},
	{
		modelName: "appointment",
		sequelize, 
		timestamps: true
	}
);

Organization.init(
	{
		id: {
			allowNull: true,
			primaryKey:true,
			type: NUMBER // SQLITE will use INTEGER
		},
		keyword: {
			type: STRING
		},
		xTimes: {
			type: NUMBER
		},
		yDays: {
			type: NUMBER,
		},
		intent: {
			type: STRING,
		}
	},
	{
		modelName: "organization",
		sequelize, 
		timestamps: true
	}
);

Connection.init(
	{
		id: {
			allowNull: true,
			primaryKey: true,
			type: NUMBER // SQLITE will use INTEGER
		},
		userId: {
			type: NUMBER
		},
		organizationId: {
			type: NUMBER
		},
		connectData: {
			type: JSON,
			allowNull: true
		}
	},
	{
		modelName: "connection",
		sequelize, 
		timestamps: true
	}
);

sequelize.sync();

export { sequelize };

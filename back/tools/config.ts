import * as dotenv from "dotenv";

dotenv.config();

let path;

switch (process.env.NODE_ENV) {
    case "dev":
        path = `${process.cwd()}/environment/.default.env`;
        break;
}


dotenv.config({ path: path });

export const API_PORT = process.env.API_PORT;
export const DB_TYPE = process.env.DB_TYPE;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;




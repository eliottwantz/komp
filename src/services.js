import { writeComposeFile } from "./file.js";
import { defaultMailpitServiceDefinition, defaultMysqlServiceDefinition, defaultPostgresServiceDefinition, } from "./schema.js";
export const allServices = ["Postgres", "MySQL", "Mailpit"];
export const addService = async (services) => {
    const composeFileDefinition = {
        services: {},
        volumes: {},
    };
    for (const service of services) {
        switch (service) {
            case "Postgres":
                composeFileDefinition.services.postgres =
                    defaultPostgresServiceDefinition;
                composeFileDefinition.volumes["postgres_data"] = null;
                break;
            case "MySQL":
                composeFileDefinition.services.mysql = defaultMysqlServiceDefinition;
                composeFileDefinition.volumes["mysql_data"] = null;
                break;
            case "Mailpit":
                composeFileDefinition.services.mailpit =
                    defaultMailpitServiceDefinition;
                break;
        }
    }
    await writeComposeFile(composeFileDefinition);
};

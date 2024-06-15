import { writeComposeFile } from "./file";
import {
  defaultMailpitServiceDefinition,
  defaultMysqlServiceDefinition,
  defaultPostgresServiceDefinition,
  type ComposeFileSchema,
} from "./schema";

export const allServices = ["Postgres", "MySQL", "Mailpit"] as const;

export type Service = (typeof allServices)[number];

export const addService = async (services: Service[]) => {
  const composeFileDefinition: ComposeFileSchema = {
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

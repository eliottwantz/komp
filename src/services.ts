import {
  getComposeFileInfo,
  writeComposeFile,
  type ComposeFileInfo,
} from "./file";
import { parse, stringify } from "yaml";
import {
  defaultMysqlServiceDefinition,
  defaultPostgresServiceDefinition,
  type ComposeFileSchema,
} from "./schema";

export const allServices = ["Postgres", "MySQL"] as const;

export type Service = (typeof allServices)[number];

// This function appends a service to your Docker Compose file
export const addService = async (service: Service) => {
  const composeFileDefinition: ComposeFileSchema = {
    services: {},
  };
  switch (service) {
    case "Postgres":
      composeFileDefinition.services.postgres =
        defaultPostgresServiceDefinition;
      break;
    case "MySQL":
      composeFileDefinition.services.mysql = defaultMysqlServiceDefinition;
      break;
  }

  await writeComposeFile(composeFileDefinition);
};

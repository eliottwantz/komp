import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { parse, stringify } from "yaml";
import { type ComposeFileSchema } from "./schema";

export type ComposeFileInfo = {
  path: string;
  exists: boolean;
};

// This function returns the paths of the Docker Compose file, with info if it exists
export const getComposeFileInfo = async (): Promise<ComposeFileInfo> => {
  const composePaths = [
    "docker-compose.yaml",
    "docker-compose.yml",
    "compose.yaml",
    "compose.yml",
  ];

  let composeFilePath: string | null = null;
  for (const path of composePaths) {
    if (existsSync(path)) {
      composeFilePath = path;
      break;
    }
  }

  return {
    path: "compose.yaml",
    exists: composeFilePath !== null,
  } satisfies ComposeFileInfo;
};

export const writeComposeFile = async (
  composeFileDefinition: ComposeFileSchema
) => {
  const composeFileInfo = await getComposeFileInfo();

  if (!composeFileInfo.exists) {
    await writeFile(composeFileInfo.path, stringify(composeFileDefinition));
  } else {
    const existingComposeFile = await parse(
      (await readFile(composeFileInfo.path)).toString()
    );
    const newComposeFile: ComposeFileSchema = {
      services: {
        ...existingComposeFile.services,
        ...composeFileDefinition.services,
      },
      volumes: {
        ...existingComposeFile.volumes,
        ...composeFileDefinition.volumes,
      },
    };
    await writeFile(composeFileInfo.path, stringify(newComposeFile));
  }
};

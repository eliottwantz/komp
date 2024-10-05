import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { parse, stringify } from "yaml";
// This function returns the paths of the Docker Compose file, with info if it exists
export const getComposeFileInfo = async () => {
    const composePaths = [
        "docker-compose.yaml",
        "docker-compose.yml",
        "compose.yaml",
        "compose.yml",
    ];
    let composeFilePath = null;
    for (const path of composePaths) {
        if (existsSync(path)) {
            composeFilePath = path;
            break;
        }
    }
    return {
        path: "compose.yaml",
        exists: composeFilePath !== null,
    };
};
export const writeComposeFile = async (composeFileDefinition) => {
    const composeFileInfo = await getComposeFileInfo();
    if (!composeFileInfo.exists) {
        await writeFile(composeFileInfo.path, stringify(composeFileDefinition));
    }
    else {
        const existingComposeFile = await parse((await readFile(composeFileInfo.path)).toString());
        const newComposeFile = {
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

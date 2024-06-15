import { runMain } from "citty";
import { main } from "./src/command";
import { getComposeFileInfo } from "./src/file";
import { parse, stringify } from "yaml";
import { readFileSync } from "node:fs";
import { addService } from "./src/services";

// await runMain(main);
await addService("MySQL");
console.log("Done");

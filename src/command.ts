import { cancel, intro, isCancel, multiselect, outro } from "@clack/prompts";
import { defineCommand } from "citty";
import packageJson from "../package.json" with { type: "json" };
import { addService, allServices, type Service } from "./services.js";

const cliName = "komp";

export const main = defineCommand({
  meta: {
    name: cliName,
    version: packageJson.version,
    description: "Add services to your Docker Compose file",
  },
  async run() {
    intro(cliName);
    const res = await multiselect({
      message: "Which service do you want to add?",
      options: allServices.map((s) => ({ value: s, name: s })),
      cursorAt: "postgres",
      required: true,
    });

    if (isCancel(res)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    await addService(res as Service[]);
    outro("Done 🐳");
  },
});

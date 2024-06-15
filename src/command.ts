import {
  cancel,
  intro,
  isCancel,
  multiselect,
  outro,
  spinner,
} from "@clack/prompts";
import { sleep, type BunFile } from "bun";
import { defineCommand, runMain } from "citty";
import { consola } from "consola";
import { box, colorize } from "consola/utils";
import { addService, allServices, type Service } from "./services";

const cliName = "komp";
const s = spinner();

export const main = defineCommand({
  meta: {
    name: cliName,
    version: "0.0.1",
    description: "Add services to your Docker Compose file",
  },
  async run() {
    intro(colorize("yellowBright", cliName));
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

    s.start("Applying...");
    await addService(res as Service[]);
    await sleep(1);
    s.stop();
    outro("Done");
  },
});

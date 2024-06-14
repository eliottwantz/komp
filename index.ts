import {
  cancel,
  intro,
  isCancel,
  multiselect,
  outro,
  spinner,
} from "@clack/prompts";
import { sleep } from "bun";
import { defineCommand, runMain } from "citty";
import { consola } from "consola";
import { box, colorize } from "consola/utils";

const cliName = "komp";
const s = spinner();

const main = defineCommand({
  meta: {
    name: cliName,
    version: "0.0.1",
    description: "Add services to your Docker Compose file",
  },
  async run() {
    intro(colorize("yellowBright", cliName));
    const res = await multiselect({
      message: "Which service do you want to add?",
      options: [
        { label: "Postgres", value: "postgres" },
        { label: "MySQL", value: "mysql" },
      ],
      cursorAt: "postgres",
      required: true,
    });

    if (isCancel(res)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    s.start("Applying...");
    await sleep(2000);
    s.stop();
    outro("Done");

    consola.log(
      box(colorize("yellowBright", res.join("\n")), {
        style: {
          borderColor: "yellowBright",
          padding: 4,
        },
        title: "Applied",
      })
    );
  },
});

await runMain(main);

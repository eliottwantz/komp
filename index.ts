#!/usr/bin/env node

import { runMain } from "citty";
import { main } from "./src/command.js";

(async () => {
  await runMain(main);
})();

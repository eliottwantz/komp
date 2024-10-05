#!/usr/bin/env node

import { runMain } from "citty";
import { main } from "./src/command";

(async () => {
  await runMain(main);
})();

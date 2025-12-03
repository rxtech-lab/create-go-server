#!/usr/bin/env node

import packageJson from "../package.json" with { type: "json" };
import { render } from "./render.js";

(async () => {
  console.info("Creating Go Server...", process.env.NODE_ENV);
  const isProd = process.env.NODE_ENV === "production";
  const version = isProd ? packageJson.version : "latest";
  await render(version);
})();

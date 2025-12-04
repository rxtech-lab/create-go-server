import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ClarkEngine, ask, createNodeGenerator } from "sourcecraft-core/node";
import * as yaml from "yaml";

const DEFAULT_TEMPLATE_DIR = "templates";

function getDefaultValues(schema: any): Record<string, any> {
  const defaults: Record<string, any> = {};

  if (schema.properties) {
    for (const [key, value] of Object.entries(schema.properties)) {
      const prop = value as any;
      if (prop.default !== undefined) {
        defaults[key] = prop.default === "yes" ? true : prop.default;
      } else if (prop.oneOf && prop.oneOf.length > 0) {
        // Use first option as default for oneOf fields
        defaults[key] = prop.oneOf[0].const;
      }
    }
  }

  return defaults;
}

export async function render(version: string) {
  const engine = new ClarkEngine();
  const templateFolder = __dirname;
  console.log(templateFolder);
  const outputFolder = process.cwd();

  // Check for -y or --yes flag
  const useDefaults =
    process.argv.includes("-y") || process.argv.includes("--yes");

  try {
    const schemaPath = path.join(
      __dirname,
      DEFAULT_TEMPLATE_DIR,
      "schema.yaml"
    );
    const schema = await fs.readFile(schemaPath, "utf-8");
    const parsedSchema = yaml.parse(schema);
    await engine.start(
      `${parsedSchema.title || "Create Go Server"} (${version})`
    );

    let results;
    if (useDefaults) {
      // Use default values
      results = getDefaultValues(parsedSchema);
      console.log("Using default values (skip prompts with -y flag)");
    } else {
      // Ask user for values
      results = await ask({
        engine: engine,
        questions: parsedSchema,
      });
    }

    const renderer = createNodeGenerator({
      questionEngine: engine,
      userValues: {
        ...results,
      },
      getTemplateFolder: () => path.join(templateFolder, DEFAULT_TEMPLATE_DIR),
      getOutputFolder: () => path.join(outputFolder, results.projectName),
    });
    await renderer.render();
    await engine.end(
      `Successfully created ${results.projectName} at ${renderer.getOutputFolder()}`
    );
  } catch (error) {
    await engine.error(`Error creating project: ${error}`);
    process.exit(1);
  }
}

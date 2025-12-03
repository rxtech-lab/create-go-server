import * as path from "path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { fileURLToPath } from "url";

const isProd = process.env.NODE_ENV === "production";

// @ts-ignore
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default defineConfig({
  mode: isProd ? "production" : "development",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "main.cjs",
    path: path.resolve(__dirname, "dist"), // Use absolute path
    library: {
      type: "commonjs2",
    },
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
    extensionAlias: {
      ".js": [".ts", ".js"],
    },
    alias: {
      "sourcecraft-core/node": path.resolve(
        __dirname,
        "node_modules/sourcecraft-core/dist/node.js"
      ),
    },
  },
  externals: [
    /^@swc/,
    /^@rspack/,
    // Add pattern for native modules
    /\.node$/,
    "express",
    ({ request }, callback) => {
      if (
        request === "sourcecraft-core" ||
        request?.startsWith("sourcecraft-core/")
      ) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      ),
    }),
    new rspack.node.NodeTargetPlugin(),
    new rspack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      entryOnly: true,
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/templates"),
          to: path.resolve(__dirname, "dist/templates"),
        },
      ],
    }),
  ],
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: false,
});

import { resolve } from "path";

import * as Shell from "shelljs";
import { init } from "../src/init";

const testPath = resolve(process.cwd(), "./temporary");

jest.mock("process", () => {
  return {
    argv: ["node", "index.js", "my-ssr-project", "--template=react-nestjs-ssr"],
    cwd: () => testPath,
  };
});

describe("test create", () => {
  beforeEach(() => {
    Shell.mkdir(testPath);
  });
  test("react-nestjs-ssr program can be init", async () => {
    process.argv = [
      "node",
      "index.js",
      "my-ssr-project",
      "--template=react-nestjs-ssr",
    ];
    await init();
    expect(
      require(resolve(testPath, "./my-ssr-project/package.json")).name ===
        "react-nestjs-ssr"
    );
  }, 100000);
  afterEach(() => {
    Shell.rm("-rf", testPath);
  });
});

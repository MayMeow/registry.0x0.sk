import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import domainUtils from "../src/lib/domains.js";

const { isPunycodeDomain } = domainUtils;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetPath = path.resolve(__dirname, "../subdomains.json");
const registry = JSON.parse(fs.readFileSync(datasetPath, "utf8")).subdomains;

const HASH_REGEX = /^[0-9a-f]{64}$/;

describe("subdomains.json", () => {
  it("contains only hashes or punycode domains", () => {
    for (const entry of registry) {
      const isHash = HASH_REGEX.test(entry);
      const isDomain = isPunycodeDomain(entry);
      expect(isHash || isDomain, `Invalid entry: ${entry}`).toBe(true);
    }
  });
});

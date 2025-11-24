import { describe, it, expect } from "vitest";
import domainUtils from "../src/lib/domains.js";

const {
  normalizeDomain,
  hashDomain,
  checkAvailability,
  isPunycodeDomain,
  BASE_SUFFIX
} = domainUtils;

describe("normalizeDomain", () => {
  it("trims, lowercases, and appends suffix", () => {
    expect(normalizeDomain("  MeOw  ")).toBe(`meow${BASE_SUFFIX}`);
  });

  it("converts emoji to punycode", () => {
    expect(normalizeDomain("🐱")).toBe(`xn--5o8h${BASE_SUFFIX}`);
  });

  it("leaves existing fqdn intact", () => {
    expect(normalizeDomain("martin.0x0.sk")).toBe("martin.0x0.sk");
  });
});

describe("hashDomain", () => {
  it("returns sha-256 hex", () => {
    const hash = hashDomain("meow.0x0.sk");
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]+$/);
  });
});

describe("isPunycodeDomain", () => {
  it("accepts lowercase ascii FQDN", () => {
    expect(isPunycodeDomain("meow.0x0.sk")).toBe(true);
  });

  it("rejects uppercase or unicode entries", () => {
    expect(isPunycodeDomain("MEOW.0x0.sk")).toBe(false);
    expect(isPunycodeDomain("🐱.0x0.sk")).toBe(false);
  });
});

describe("checkAvailability", () => {
  const registry = ["martin.0x0.sk", hashDomain("hidden.0x0.sk")];

  it("detects public matches", () => {
    const result = checkAvailability("martin", registry);
    expect(result).toMatchObject({ isMatch: true, matchType: "public" });
  });

  it("detects hashed matches", () => {
    const result = checkAvailability("hidden", registry);
    expect(result).toMatchObject({ isMatch: true, matchType: "hashed" });
  });

  it("flags free domains", () => {
    const result = checkAvailability("freebie", registry);
    expect(result.isMatch).toBe(false);
  });
});

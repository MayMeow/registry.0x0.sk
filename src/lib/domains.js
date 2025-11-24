const crypto = require("node:crypto");
const punycode = require("node:punycode");

const BASE_SUFFIX = ".0x0.sk";

const normalizeDomain = (raw) => {
  if (!raw) {
    return "";
  }

  let value = raw.trim();
  if (!value) {
    return "";
  }

  value = value.replace(/\s+/g, "");

  if (!value.includes(".")) {
    value = `${value}${BASE_SUFFIX}`;
  }

  if (value.endsWith(".")) {
    value = value.slice(0, -1);
  }

  const labels = value.split(".");
  const asciiLabels = labels.map((label) =>
    label ? punycode.toASCII(label.toLowerCase()) : ""
  );
  return asciiLabels.join(".");
};

const hashDomain = (normalized) => {
  if (!normalized) {
    return "";
  }

  return crypto.createHash("sha256").update(normalized).digest("hex");
};

const isPunycodeDomain = (value) => {
  if (typeof value !== "string" || !value) {
    return false;
  }

  if (value !== value.toLowerCase()) {
    return false;
  }

  if (!value.endsWith(BASE_SUFFIX)) {
    return false;
  }

  if (!/^[a-z0-9.-]+$/.test(value)) {
    return false;
  }

  const labels = value.split(".");
  return labels.every((label) => {
    if (!label) {
      return false;
    }
    try {
      return punycode.toASCII(label) === label;
    } catch (error) {
      return false;
    }
  });
};

const checkAvailability = (query, registryEntries) => {
  const normalized = normalizeDomain(query);
  if (!normalized) {
    return { normalized, isMatch: false, matchType: null };
  }

  const registry = new Set(registryEntries);
  if (registry.has(normalized)) {
    return { normalized, isMatch: true, matchType: "public" };
  }

  const hashed = hashDomain(normalized);
  if (registry.has(hashed)) {
    return { normalized, isMatch: true, matchType: "hashed" };
  }

  return { normalized, isMatch: false, matchType: null };
};

module.exports = {
  BASE_SUFFIX,
  normalizeDomain,
  hashDomain,
  checkAvailability,
  isPunycodeDomain
};

const fs = require("node:fs");
const path = require("node:path");

module.exports = () => {
  const filePath = path.join(__dirname, "..", "..", "subdomains.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  return parsed.subdomains || [];
};

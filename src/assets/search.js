(function () {
  const form = document.getElementById("search-form");
  const input = document.getElementById("query");
  const resultCard = document.getElementById("result-card");
  const dataEl = document.getElementById("subdomain-data");

  if (!form || !input || !resultCard || !dataEl) {
    return;
  }

  let registry;
  try {
    registry = new Set(JSON.parse(dataEl.textContent));
  } catch (error) {
    console.error("Failed to parse registry data", error);
    return;
  }

  const statusEl = document.createElement("p");
  statusEl.className = "status muted";
  const metaEl = document.createElement("p");
  metaEl.className = "meta";
  resultCard.innerHTML = "";
  resultCard.append(statusEl, metaEl);

  function render({ status, message, meta = "" }) {
    statusEl.className = `status ${status}`;
    statusEl.textContent = message;
    metaEl.textContent = meta;
    metaEl.classList.toggle("muted", !meta);
  }

  function normalizeDomain(raw) {
    if (!raw) {
      return "";
    }

    let value = raw.trim();
    if (!value) {
      return "";
    }

    value = value.replace(/\s+/g, "");

    if (!value.includes(".")) {
      value = `${value}.0x0.sk`;
    }

    if (value.endsWith(".")) {
      value = value.slice(0, -1);
    }

    try {
      const host = new URL(`https://${value}`).hostname;
      return host.toLowerCase();
    } catch (error) {
      return value.toLowerCase();
    }
  }

  async function sha256Hex(value) {
    if (!window.crypto?.subtle) {
      throw new Error("SubtleCrypto API unavailable");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function handleQuery(value) {
    const normalized = normalizeDomain(value);

    if (!normalized) {
      render({ status: "muted", message: "Start typing to see availability." });
      return;
    }

    render({ status: "muted", message: "Checking ledger…" });

    const plainMatch = registry.has(normalized);
    let hashMatch = false;

    try {
      const hashed = await sha256Hex(normalized);
      hashMatch = registry.has(hashed);
    } catch (error) {
      render({
        status: "taken",
        message: "Your browser blocked the crypto module.",
        meta: "Enable secure context (https) to check hashed entries."
      });
      return;
    }

    if (plainMatch || hashMatch) {
      render({
        status: "taken",
        message: `${normalized} is already reserved`,
        meta: hashMatch && !plainMatch ? "This match exists as a private hash." : "Listed in the public ledger."
      });
    } else {
      render({
        status: "free",
        message: `${normalized} is available`,
        meta: "Ping via Ko-fi to request it."
      });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleQuery(input.value);
  });

  input.addEventListener("input", () => {
    const value = input.value;
    if (!value) {
      render({ status: "muted", message: "Start typing to see availability." });
      return;
    }

    handleQuery(value);
  });
})();

import fs from "fs";
import path from "path";

/**
 * Validates bookmark JSON files in the data directory.
 * Checks for duplicate names, which the JSON schema cannot detect.
 */
function validateBookmarks() {
  const dataDir = path.resolve(process.cwd(), "src", "data");
  const relDataDir = path.relative(process.cwd(), dataDir) || ".";
  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    console.log(`No JSON files found in ${relDataDir}.`);
    process.exit(0);
  }
  console.log(`Checking JSON files in ${relDataDir}`);

  let hasErrors = false;
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
      console.error(
        `Failed to read ${file}: ${e && e.message ? e.message : e}`,
      );
      hasErrors = true;
      continue;
    }

    // Skip if not a bookmarks file (no matching schema)
    if (data.$schema !== "bookmarks.schema.json") {
      console.log(`Skipping ${file} (not a bookmarks file)`);
      continue;
    }

    console.log(`Validating ${file}`);
    let errors = [];
    function checkFolder(folder, folderPath) {
      const names = new Map();
      if (!Array.isArray(folder.bookmarks)) return;
      for (const item of folder.bookmarks) {
        const name = item.name;
        if (!name) continue;
        if (names.has(name)) {
          errors.push(`${folderPath}: duplicate name "${name}"`);
        } else {
          names.set(name, true);
        }
        if (item.bookmarks) {
          checkFolder(item, `${folderPath}/${name}`);
        }
      }
    }

    checkFolder(data, data.name || "root");

    if (errors.length) {
      console.error(`Errors found in ${file}:`);
      errors.forEach((e) => console.error(" -", e));
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("Errors found during bookmark validation. See output above.");
    process.exit(1);
  }

  console.log("All bookmark files validated. No errors found.");
  process.exit(0);
}

validateBookmarks();

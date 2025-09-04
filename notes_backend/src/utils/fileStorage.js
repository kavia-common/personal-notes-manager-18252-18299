const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');

/**
 * Ensure the data directory and notes file exist; create if missing.
 */
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(NOTES_FILE)) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify({ notes: [] }, null, 2), 'utf-8');
  }
}

/**
 * Read notes data from file.
 * @returns {{ notes: Array }}
 */
function readNotes() {
  ensureStorage();
  const raw = fs.readFileSync(NOTES_FILE, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.notes)) {
      return { notes: [] };
    }
    return parsed;
  } catch (e) {
    // If file is corrupted, reset it to a safe state
    return { notes: [] };
  }
}

/**
 * Write notes data to file (atomic write).
 * @param {{ notes: Array }} data
 */
function writeNotes(data) {
  ensureStorage();
  const tmpFile = `${NOTES_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpFile, NOTES_FILE);
}

module.exports = {
  readNotes,
  writeNotes,
};

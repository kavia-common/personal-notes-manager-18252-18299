const crypto = require('crypto');

/**
 * Generate a URL-safe unique ID.
 * @returns {string}
 */
function generateId() {
  return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
}

module.exports = { generateId };

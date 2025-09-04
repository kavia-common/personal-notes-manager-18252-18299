function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOptionalString(value) {
  if (value === undefined) return true;
  return typeof value === 'string';
}

function validateNoteCreate(payload) {
  const errors = [];
  if (!isNonEmptyString(payload.title)) {
    errors.push('title is required and must be a non-empty string');
  }
  if (payload.content !== undefined && typeof payload.content !== 'string') {
    errors.push('content must be a string if provided');
  }
  if (payload.tags !== undefined) {
    if (!Array.isArray(payload.tags) || !payload.tags.every((t) => typeof t === 'string')) {
      errors.push('tags must be an array of strings if provided');
    }
  }
  return errors;
}

function validateNoteUpdate(payload) {
  const errors = [];
  if (payload.title !== undefined && !isNonEmptyString(payload.title)) {
    errors.push('title must be a non-empty string when provided');
  }
  if (payload.content !== undefined && typeof payload.content !== 'string') {
    errors.push('content must be a string when provided');
  }
  if (payload.tags !== undefined) {
    if (!Array.isArray(payload.tags) || !payload.tags.every((t) => typeof t === 'string')) {
      errors.push('tags must be an array of strings when provided');
    }
  }
  if (Object.keys(payload).length === 0) {
    errors.push('at least one field (title, content, tags) must be provided to update');
  }
  return errors;
}

module.exports = {
  isNonEmptyString,
  isOptionalString,
  validateNoteCreate,
  validateNoteUpdate,
};

const { readNotes, writeNotes } = require('../utils/fileStorage');
const { generateId } = require('../utils/id');

/**
 * NotesService handles business logic and persistence for notes.
 */
class NotesService {
  /**
   * Get all notes, optionally filtered by query parameters.
   * @param {{ search?: string, tag?: string }} filter
   * @returns {import('../models/note').Note[]}
   */
  findAll(filter = {}) {
    const { notes } = readNotes();
    let results = notes;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (n) =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.content && n.content.toLowerCase().includes(q))
      );
    }
    if (filter.tag) {
      results = results.filter((n) => Array.isArray(n.tags) && n.tags.includes(filter.tag));
    }
    return results;
  }

  /**
   * Get a single note by ID.
   * @param {string} id
   * @returns {import('../models/note').Note | null}
   */
  findById(id) {
    const { notes } = readNotes();
    return notes.find((n) => n.id === id) || null;
  }

  /**
   * Create a new note.
   * @param {{title: string, content?: string, tags?: string[]}} payload
   * @returns {import('../models/note').Note}
   */
  create(payload) {
    const { notes } = readNotes();
    const now = new Date().toISOString();
    const note = {
      id: generateId(),
      title: payload.title.trim(),
      content: typeof payload.content === 'string' ? payload.content : '',
      tags: Array.isArray(payload.tags) ? payload.tags : [],
      createdAt: now,
      updatedAt: now,
    };
    const updated = { notes: [note, ...notes] };
    writeNotes(updated);
    return note;
  }

  /**
   * Update an existing note by ID.
   * @param {string} id
   * @param {{title?: string, content?: string, tags?: string[]}} payload
   * @returns {import('../models/note').Note | null}
   */
  update(id, payload) {
    const data = readNotes();
    const idx = data.notes.findIndex((n) => n.id === id);
    if (idx === -1) return null;

    const existing = data.notes[idx];
    const updated = {
      ...existing,
      title: payload.title !== undefined ? payload.title.trim() : existing.title,
      content: payload.content !== undefined ? payload.content : existing.content,
      tags: payload.tags !== undefined ? payload.tags : existing.tags,
      updatedAt: new Date().toISOString(),
    };
    data.notes[idx] = updated;
    writeNotes(data);
    return updated;
  }

  /**
   * Delete a note by ID.
   * @param {string} id
   * @returns {boolean} true if deleted, false if not found
   */
  delete(id) {
    const data = readNotes();
    const initialLen = data.notes.length;
    data.notes = data.notes.filter((n) => n.id !== id);
    if (data.notes.length === initialLen) {
      return false;
    }
    writeNotes(data);
    return true;
  }
}

module.exports = new NotesService();

const notesService = require('../services/notes');
const { validateNoteCreate, validateNoteUpdate } = require('../utils/validation');

class NotesController {
  // PUBLIC_INTERFACE
  /**
   * Get all notes with optional filters.
   * Query params: search (string), tag (string)
   */
  list(req, res) {
    const { search, tag } = req.query || {};
    const notes = notesService.findAll({ search, tag });
    return res.status(200).json({ data: notes });
    /**
     * This is a public function.
     */
  }

  // PUBLIC_INTERFACE
  /**
   * Get a note by ID.
   * Params: id
   */
  get(req, res) {
    const { id } = req.params;
    const note = notesService.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(200).json({ data: note });
    /**
     * This is a public function.
     */
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new note.
   * Body: { title: string, content?: string, tags?: string[] }
   */
  create(req, res) {
    const errors = validateNoteCreate(req.body || {});
    if (errors.length) {
      return res.status(400).json({ errors });
    }
    const note = notesService.create(req.body);
    return res.status(201).json({ data: note });
    /**
     * This is a public function.
     */
  }

  // PUBLIC_INTERFACE
  /**
   * Update an existing note.
   * Params: id
   * Body: { title?: string, content?: string, tags?: string[] }
   */
  update(req, res) {
    const errors = validateNoteUpdate(req.body || {});
    if (errors.length) {
      return res.status(400).json({ errors });
    }
    const updated = notesService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(200).json({ data: updated });
    /**
     * This is a public function.
     */
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note by ID.
   * Params: id
   */
  delete(req, res) {
    const ok = notesService.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(204).send();
    /**
     * This is a public function.
     */
  }
}

module.exports = new NotesController();

# personal-notes-manager-18252-18299

Notes Backend (Express)
- Start: npm start (PORT defaults to 3000)
- Dev: npm run dev
- API Docs: GET /docs

Notes Endpoints
- GET /notes                -> list notes (optional ?search= and/or ?tag=)
- POST /notes               -> create note { title, content?, tags?[] }
- GET /notes/:id            -> retrieve note by ID
- PUT /notes/:id            -> update note { title?, content?, tags?[] }
- DELETE /notes/:id         -> delete note

Storage
- File-based persistence at notes_backend/data/notes.json (auto-created)

Validation
- Robust input validation for create/update with detailed 400 responses.

Health
- GET / -> service health payload
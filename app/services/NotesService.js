import DiscoveryService from './DiscoveryService.js';
import api from './ApiService.js';

const notesUri = DiscoveryService.getUri('api-gateway', '/notes');

class NotesService {

    getNotesBySessionId(sessionId) {
        return api.get(`${notesUri}?sessionId=${sessionId}`);
    }

    postNote(sessionId, newNote) {
        const newNoteData = {
            sessionId,
            note: newNote,
        };
        return api.post(notesUri, newNoteData);
    }

    patchNote(noteId, path, value) {
        const op = { path, value };
        return api.patch(`${notesUri}/${noteId}`, op);
    }
}

export default new NotesService();

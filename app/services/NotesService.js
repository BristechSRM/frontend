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
}

export default new NotesService();

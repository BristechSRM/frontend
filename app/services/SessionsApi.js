import fetch from 'isomorphic-fetch';
import immutable from 'immutable';
import Promise from 'bluebird';

let SessionsApi = {
   getSessions(filters) {
      return new Promise((resolve, reject) => {
        let sessions = fetch('sessions.json')
         .then(response => response.json())
         .then(allSessions => {

            if (!filters) {
              return allSessions;
            }

           var noFiltersEnabled = filters.every(f => !f);

           if (noFiltersEnabled) {
             return allSessions;
           }

           var filteredSessions =
              allSessions.filter(s => filters.get(s.speakerStatus.toString()));

           return filteredSessions;
         })
         .then(sessions => resolve(immutable.List(sessions)))
         .catch(error => reject(error));
      });
  }
}

export default SessionsApi;

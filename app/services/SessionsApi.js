import fetch from 'isomorphic-fetch';
import immutable from 'immutable';

let SessionsApi = {
   getSessions(filters, sortProperty, isSortOrderAscending) {
      return new Promise((resolve, reject) => {
        let sessions = fetch('http://api.bris.tech/talkoutlines')
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
              allSessions.filter(s => filters.get(s.status.toString()));

           return filteredSessions;
         })
         .then(sessions => resolve(immutable.List(sessions)))
         .catch(error => reject(error));
      });
  }
}

export default SessionsApi;

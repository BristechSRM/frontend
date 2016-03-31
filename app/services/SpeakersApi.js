import fetch from 'isomorphic-fetch';
import immutable from 'immutable';
import Promise from 'bluebird';

let SpeakersApi = {
   getSpeakers(filters) {
      return new Promise((resolve, reject) => {
        let speakers = fetch('speakers.json')
         .then(response => response.json())
         .then(allSpeakers => {

            if (!filters) {
              return allSpeakers;
            }

           var noFiltersEnabled = filters.every(f => !f);

           if (noFiltersEnabled) {
             return allSpeakers;
           }

           var filteredSpeakers =
              allSpeakers.filter(s => filters.get(s.speakerStatus.toString()));

           return filteredSpeakers;
         })
         .then(speakers => resolve(immutable.List(speakers)))
         .catch(error => reject(error));
      });
  }
}

export default SpeakersApi;

import { configure } from '@kadira/storybook';

function loadStories() {
    require('../app/stories/session-list');
    require('../app/stories/session-card');
    require('../app/stories/events-list');
    require('../app/stories/event-session');
}

configure(loadStories, module);

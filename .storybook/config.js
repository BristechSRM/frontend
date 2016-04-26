import { configure } from '@kadira/storybook';

function loadStories() {
    require('../app/stories/events-list');
    // require as many as stories you need.
}

configure(loadStories, module);

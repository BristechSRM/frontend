import immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = immutable.fromJS({
    locationBeforeTransitions: undefined,
});

export default function routing(state = initialState, action) {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload,
        });
    }

    return state;
}

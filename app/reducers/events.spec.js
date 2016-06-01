/* global expect */

import { createAction } from 'redux-actions';
import immutable from 'immutable';
import events from './events';
import * as actionTypes from '../constants/actionTypes';

const initialState = events(undefined, createAction('__FAKE_ACTION__')());

describe('events reducer', () => {
    describe('initially', () => {
        it('sets isFetching to false and events as an empty list', () => {
            expect(initialState.isFetching).to.equal(false);
            expect(initialState.events).to.equal(immutable.List());
        });
    });

    describe('GET_EVENTS_START', () => {
        it('sets isFetching to true', () => {
            const startState = initialState.withMutations(map => {
                map.set('isFetching', false);
            });

            const nextState = events(startState, createAction(actionTypes.GET_EVENTS_START)());

            expect(nextState.isFetching).to.equal(true);
        });
    });

    describe('GET_EVENTS_ERROR', () => {
        let startState;
        beforeEach(() => {
            startState = initialState.withMutations(map => {
                map.set('isFetching', true).set('error', null);
            });
        });

        it('sets isFetching to false', () => {
            const nextState = events(startState, createAction(actionTypes.GET_EVENTS_ERROR)());

            expect(nextState.isFetching).to.equal(false);
        });

        it('sets error', () => {
            const error = 'error';

            const nextState = events(startState, createAction(actionTypes.GET_EVENTS_ERROR)(error));

            expect(nextState.error).to.equal(error);
        });
    });

    describe('GET_EVENTS_COMPLETE', () => {
        let startState;
        beforeEach(() => {
            startState = initialState.withMutations(map => {
                map.set('isFetching', true);
            });
        });

        it('sets isFetching to false', () => {
            const nextState = events(startState, createAction(actionTypes.GET_EVENTS_COMPLETE)());

            expect(nextState.isFetching).to.equal(false);
        });

        it('sets events', () => {
            const eventList = ['e1', 'e2', 'e3'];

            const nextState = events(startState, createAction(actionTypes.GET_EVENTS_COMPLETE)(eventList));

            expect(nextState.events).to.equal(eventList);
        });
    });
});

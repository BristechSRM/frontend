/* global sinon */

import '../utils/mockDependencies';

import Q from 'q';
import immutable from 'immutable';

import * as actions from './index';
import * as actionTypes from '../constants/actionTypes';
const getDependency = actions.default.__GetDependency__;

const SessionsService = getDependency('SessionsService');

describe('actions', () => {
    let dispatch;
    beforeEach(() => {
        dispatch = sinon.stub();
    });

    describe('getAllSessions', () => {
        let deferred;
        beforeEach(() => {
            deferred = Q.defer();
            sinon.stub(SessionsService, 'getAllSessions').returns(deferred.promise);
            actions.getAllSessions()(dispatch);
        });

        afterEach(() => {
            SessionsService.getAllSessions.restore();
        });

        it('dispatches UPDATE_SESSIONS_START action', () => {
            sinon.assert.calledWith(dispatch, {
                type: actionTypes.UPDATE_SESSIONS_START,
                payload: undefined,
            });
        });

        describe('on success', () => {
            let sessions;
            beforeEach(() => {
                sessions = [1, 2, 3];
                deferred.resolve(sessions);
            });

            it('dispatches UPDATE_SESSIONS_COMPLETE action', () =>
                deferred.promise.finally(() => {
                    sinon.assert.calledWith(dispatch, {
                        type: actionTypes.UPDATE_SESSIONS_COMPLETE,
                        payload: immutable.List(sessions),
                    });
                })
            );
        });

        describe('on fail', () => {
            let error;
            beforeEach(() => {
                error = 'error';
                deferred.reject(error);
            });

            it('dispatches UPDATE_SESSIONS_ERROR action', (done) => {
                deferred.promise.finally(() => {
                    sinon.assert.calledWith(dispatch, {
                        type: actionTypes.UPDATE_SESSIONS_ERROR,
                        payload: error,
                    });
                    done();
                });
            });
        });
    });
});

import { createSelector } from 'reselect';

/**
 * The global state selectors
 */

const selectGlobal = () => (state) => {
    // return state.get('live')
    return state.main
};
const makeSelectGlobal = () => createSelector(
    selectGlobal(),
    (substate) => {
        return substate
    }
);


const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    makeSelectGlobal,
    makeSelectLocationState,
};

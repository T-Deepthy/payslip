import { createStore, applyMiddleware , compose } from 'redux';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';
import  thunk  from 'redux-thunk';
export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(thunk)
        )
    );
    return store;
}

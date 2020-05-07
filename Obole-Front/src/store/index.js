import { createStore, compose } from 'redux';
import reducer from './reducer';

import middleware from './middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(middleware);

const store = createStore(reducer, enhancers);

export default store;

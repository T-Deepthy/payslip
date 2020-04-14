import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import salaryComponents from './salaryComponents';
import designations from './designations';
import employees from './employees';

export default (history) => combineReducers({
	'router': connectRouter(history),
	salaryComponents,
	designations,
	employees,
});


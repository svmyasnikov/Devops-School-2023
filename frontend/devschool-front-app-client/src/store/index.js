import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'

import restClient from '../middleware/restClient'
import singleEdit from '../middleware/singleEdit';
import tableReducer from '../reducers/tableReducer';
import singleReducer from '../reducers/singleReducer';
import restReducer from '../reducers/restReducer';

const store = createStore(combineReducers({tableReducer: tableReducer, singleReducer: singleReducer, restReducer: restReducer, toastr: toastrReducer}), {},
    applyMiddleware(singleEdit, restClient));

export default store;
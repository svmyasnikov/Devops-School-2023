import * as types from 'constants/action-types';

const initialState =
    {
        paths: []
    };

export default (state = {...initialState}, action) => {
    if (action.type === types.SAVE_RESPONSE_HEADER) {
        const requestPath = {
            path: [...action.payload.path.value.split('|')],
            url: action.payload.path.url
        };
        const paths = state.paths.concat(requestPath);

        return {...state, paths: paths};
    } else {
        return state;
    }
}



import * as types from 'constants/action-types';

const initialState =
    {
        students: [],
        schools: [],
        courses: [],
        mentors: [],
        showProgressBar: false
    };

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_STUDENTS_SUCCESS:
            return {...state, ...action.payload};
        case types.GET_ALL_SCHOOLS_SUCCESS:
            const allSchools = action.payload.schools;
            return {...state, schools: allSchools};
        case types.GET_ALL_COURSES_SUCCESS:
            const allCourses = action.payload.courses;
            return {...state, courses: allCourses};
        case types.GET_ALL_MENTORS_SUCCESS:
            const allMentors = action.payload.mentors;
            return {...state, mentors: allMentors};
        default:
            return state;
    }
}



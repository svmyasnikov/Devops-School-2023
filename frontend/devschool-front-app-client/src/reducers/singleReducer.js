import * as types from 'constants/action-types';

const initialState =
    {
        student: {
            id: undefined,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            mentor: undefined,
            school: undefined,
            courses:  []
        },
        school: {
            id: undefined,
            number: '',
            startDate: new Date(),
            endDate: new Date()
        },
        course: {
            id: undefined,
            name: ''
        },
        mentor: {
            id: undefined,
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        courses: [],
        schools: [],
        mentors: []
    };

export default (state = {...initialState}, action) => {
    let newState = {};
    let student = {};
    let school = {};
    let course = {};
    let mentor = {};

    switch (action.type) {
        case types.SET_SCHOOL_FIELD:
            const schoolField = action.payload.schoolField;
            school = {...state.school};
            newState = {...state, school};
            newState.school[schoolField.name] = schoolField.value;
            return newState;
        case types.SET_STUDENT_FIELD:
            const studentField = action.payload.studentField;
            student = {...state.student};
            newState = {...state, student};
            newState.student[studentField.name] = studentField.value;
            return newState;
        case types.SET_COURSE_FIELD:
            const courseField = action.payload.courseField;
            course = {...state.course};
            newState = {...state, course};
            newState.course[courseField.name] = courseField.value;
            return newState;
        case types.SET_MENTOR_FIELD:
            const mentorField = action.payload.mentorField;
            mentor = {...state.mentor};
            newState = {...state, mentor};
            newState.mentor[mentorField.name] = mentorField.value;
            return newState;
        case types.RESET_STUDENT:
            return {...initialState};
        case types.RESET_SCHOOL:
            return {...initialState};
        case types.RESET_COURSE:
            return {...initialState};
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



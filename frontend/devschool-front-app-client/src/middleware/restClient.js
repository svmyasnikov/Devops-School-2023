import * as types from 'constants/action-types';
import * as urls from 'constants/urls';
import * as requestBuilder from '../utils/requestBuilder'
import * as toast from '../utils/showToast'

const restClient = (store) => (next) => (action) => {

    next(action);
    switch (action.type) {
        case types.GET_ALL_SCHOOLS:
            requestBuilder.request('GET', urls.GET_ALL_SCHOOLS_URL).end((err, res) => {
                action.callback();
                toast.showToast(urls.GET_ALL_SCHOOLS_URL, res);
                return next({
                    type: types.GET_ALL_SCHOOLS_SUCCESS,
                    payload: {
                        schools: res.body
                    }
                });
            });
            break;
        case types.GET_ALL_MENTORS:
            requestBuilder.request('GET', urls.GET_ALL_MENTORS_URL).end((err, res) => {
                action.callback();
                toast.showToast(urls.GET_ALL_MENTORS_URL, res);
                return next({
                    type: types.GET_ALL_MENTORS_SUCCESS,
                    payload: {
                        mentors: res.body
                    }
                });
            });
            break;
        case types.GET_ALL_COURSES:
            requestBuilder.request('GET', urls.GET_ALL_COURSES_URL).end((err, res) => {
                action.callback();
                toast.showToast(urls.GET_ALL_COURSES_URL, res);
                return next({
                    type: types.GET_ALL_COURSES_SUCCESS,
                    payload: {
                        courses: res.body
                    }
                });
            });
            break;
        case types.GET_ALL_STUDENTS:
            requestBuilder.request('POST', urls.GET_ALL_STUDENTS_URL).send({}).end((err, res) => {
                action.callback();
                toast.showToast(urls.GET_ALL_STUDENTS_URL, res);
                return next({
                    type: types.GET_ALL_STUDENTS_SUCCESS,
                    payload: {
                        students: res.body
                    }
                });
            });
            break;
        case types.SEND_STUDENT:
            const student = {...store.getState().singleReducer.student};
            requestBuilder.request('POST', urls.SAVE_STUDENT_URL).send(student).end((err, res) => {
                action.payload.callback();
                toast.showToast(urls.SAVE_STUDENT_URL, res);
                return next({
                    type: '',
                    payload: {
                        isNewStudent: action.payload.isNewStudent
                    }
                });
            });
            break;
        case types.SEND_SCHOOL:
            const school = {...store.getState().singleReducer.school};
            requestBuilder.request('POST', urls.SAVE_SCHOOL_URL).send(school).end((err, res) => {
                action.payload.callback();
                toast.showToast(urls.SAVE_SCHOOL_URL, res);
                return next({
                    type: '',
                    payload: {
                        isNewSchool: action.payload.isNewSchool
                    }
                });
            });
            break;
        case types.SEND_COURSE:
            const course = {...store.getState().singleReducer.course};
            requestBuilder.request('POST', urls.SAVE_COURSE_URL).send(course).end((err, res) => {
                action.payload.callback();
                toast.showToast(urls.SAVE_COURSE_URL, res);
                return next({
                    type: '',
                    payload: {
                        isNewCourse: action.payload.isNewCourse
                    }
                });
            });
            break;
        case types.SEND_MENTOR:
            const mentor = {...store.getState().singleReducer.mentor};
            requestBuilder.request('POST', urls.SAVE_MENTOR_URL).send(mentor).end((err, res) => {
                action.payload.callback();
                toast.showToast(urls.SAVE_MENTOR_URL, res);
                return next({
                    type: '',
                    payload: {
                        isNewMentor: action.payload.isNewMentor
                    }
                });
            });
            break;
        default:
            break;
    }
};

export default restClient;
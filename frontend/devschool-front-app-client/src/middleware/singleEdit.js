import * as types from 'constants/action-types';

const singleEdit = (store) => (next) => (action) => {

    next(action);
    switch (action.type) {
        case types.SAVE_STUDENT:
            const student = store.getState().singleReducer.student;
            const isNewstudent = student.id === 0;

            return next({
                type: types.SEND_STUDENT,
                payload: {
                    isNewstudent: isNewstudent,
                    callback: action.callback
                }
            });
        case types.SAVE_SCHOOL:
            const school = store.getState().singleReducer.school;
            const isNewSchool = school.id === 0;

            return next({
                type: types.SEND_SCHOOL,
                payload: {
                    isNewSchool: isNewSchool,
                    callback: action.callback
                }
            });
        case types.SAVE_COURSE:
            const course = store.getState().singleReducer.course;
            const isNewCourse = course.id === 0;

            return next({
                type: types.SEND_COURSE,
                payload: {
                    isNewSchool: isNewCourse,
                    callback: action.callback
                }
            });
        case types.SAVE_MENTOR:
            const mentor = store.getState().singleReducer.mentor;
            const isNewMentor = mentor.id === 0;

            return next({
                type: types.SEND_MENTOR,
                payload: {
                    isNewSchool: isNewMentor,
                    callback: action.callback
                }
            });
        default:
            break;
    }
};

export default singleEdit;
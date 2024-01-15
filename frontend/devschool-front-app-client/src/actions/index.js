import * as types from 'constants/action-types';

export const resetSchool = () => ({
    type: types.RESET_SCHOOL
});

export const resetStudent = () => ({
    type: types.RESET_STUDENT
});

export const resetCourse = () => ({
    type: types.RESET_COURSE
});

export const resetMentor = () => ({
    type: types.RESET_MENTOR
});

export const getAllStudents = (callback) => ({
    type: types.GET_ALL_STUDENTS,
    callback: callback
});

export const getAllCourses = (callback) => ({
    type: types.GET_ALL_COURSES,
    callback: callback
});

export const getAllSchools = (callback) => ({
    type: types.GET_ALL_SCHOOLS,
    callback: callback
});

export const getAllMentors = (callback) => ({
    type: types.GET_ALL_MENTORS,
    callback: callback
});

export const setStudentField = (studentField) => ({
    type: types.SET_STUDENT_FIELD,
    payload: {
        studentField: studentField
    }
});

export const setCourseField = (courseField) => ({
    type: types.SET_COURSE_FIELD,
    payload: {
        courseField: courseField
    }
});

export const setSchoolField = (schoolField) => ({
    type: types.SET_SCHOOL_FIELD,
    payload: {
        schoolField: schoolField
    }
});

export const setMentorField = (mentorField) => ({
    type: types.SET_MENTOR_FIELD,
    payload: {
        mentorField: mentorField
    }
});

export const saveStudent = (callback) => ({
    type: types.SAVE_STUDENT,
    callback: callback
});

export const saveSchool = (callback) => ({
    type: types.SAVE_SCHOOL,
    callback: callback
});

export const saveCourse = (callback) => ({
    type: types.SAVE_COURSE,
    callback: callback
});

export const saveMentor = (callback) => ({
    type: types.SAVE_MENTOR,
    callback: callback
});



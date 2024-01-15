import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setStudentField, saveStudent, getAllCourses, getAllSchools, getAllMentors} from 'actions';
import ProgressBar from 'common/ProgressBar';
import style from "./EditStudentDialog.scss"
import CourseList from "./CourseList"

class EditStudentDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCourses: false,
            showProgressBar: false
        };
    }

    componentDidMount = () => {
        this.setState({
            showProgressBar: true
        });

        this.props.getAllCourses(() => this.props.getAllMentors(() => this.props.getAllSchools(() => this.setState({
            showProgressBar: false
        }))));
    };

    saveStudentCallback = () => {
        this.setState({
            showProgressBar: false
        });
        this.props.saveStudentCallback();
    };

    saveStudent = () => {
        this.setState({
            showProgressBar: true
        });
        this.props.saveStudent(() => this.saveStudentCallback());
    };

    render() {
        const {courses, setStudentField, schools, mentors, addedCourses, student, close} = this.props;
        const closedClassName = style["modal"] + ' ' + style["fade"];
        const openClassName = closedClassName + ' ' + style["show"] + ' ' + style['openDialog'];
        const hideCoursesClassName = style["accordion-collapse"] + ' ' + style["collapse"];
        const showCoursesClassName = hideCoursesClassName + ' ' + style["show"];
        const buttonShowCoursesClassName = style["accordion-button"];
        const buttonHideCoursesClassName = buttonShowCoursesClassName + ' ' + style["collapsed"];

        return (
            <div className={this.props.isOpen ? openClassName : closedClassName} tabIndex="-1">
                <div className={style["modal-dialog"]}
                     style={{maxHeight: window.screen.height * 2 / 3, overflow: 'auto'}}>
                    <div className={style["modal-content"]}>
                        <div className={style["modal-header"]}>
                            <h5 className={style["modal-title"]} id="staticBackdropLabel">{student.id ? 'Edit student' : 'New student'}</h5>
                        </div>
                        <div className={style["modal-body"]}>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">First name</span>
                                <input value={student.firstName} type="text" className={style["form-control"]}
                                       onChange={(event) => setStudentField({
                                           name: 'firstName',
                                           value: event.target.value
                                       })}
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">Last name</span>
                                <input type="text" value={student.lastName} className={style["form-control"]}
                                       aria-describedby="inputGroup-sizing-default"
                                       onChange={(event) => setStudentField({
                                           name: 'lastName',
                                           value: event.target.value
                                       })}/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]} id="inputGroup-sizing-default">Phone</span>
                                <input type="text" value={student.phone} className={style["form-control"]}
                                       aria-describedby="inputGroup-sizing-default"
                                       onChange={(event) => setStudentField({
                                           name: 'phone',
                                           value: event.target.value
                                       })}/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]} id="inputGroup-sizing-default">E-mail</span>
                                <input type="text" value={student.email} className={style["form-control"]}
                                       aria-describedby="inputGroup-sizing-default"
                                       onChange={(event) => setStudentField({
                                           name: 'email',
                                           value: event.target.value
                                       })}/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <label className={style["input-group-text"]} htmlFor="inputGroupSelect01">School</label>
                                <select className={style["form-select"]} onChange={(event => setStudentField({
                                    name: 'school',
                                    value: schools.find(s => s.id == event.target.value)
                                }))}>
                                    <option
                                        defaultValue={student.school ? student.school.id : ''}>{student.school ? student.school.number : 'Choose...'}</option>
                                    {schools.map((value, index) => (
                                        <option key={index} value={value.id}>{value.number}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <label className={style["input-group-text"]} htmlFor="inputGroupSelect01">Mentor</label>
                                <select className={style["form-select"]} onChange={(event => setStudentField({
                                    name: 'mentor',
                                    value: mentors.find(s => s.id == event.target.value)
                                }))} value={student.mentor ? student.mentor.id : ''} >
                                    <option defaultValue={''}>{'Choose...'}</option>
                                    {mentors.map((value, index) => (
                                        <option key={index}
                                                value={value.id}>{value.firstName + ' ' + value.lastName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={style["accordion"]} id="accordionExample">
                            <div className={style["accordion-item"]}>
                                <h2 className={style["accordion-header"]} id="headingOne">
                                    <button
                                        className={this.state.showCourses ? buttonShowCoursesClassName : buttonHideCoursesClassName}
                                        type="button" onClick={() => {
                                        this.setState({
                                            showCourses: !this.state.showCourses
                                        })
                                    }}>
                                        Courses
                                    </button>
                                </h2>
                                <div id="collapseOne"
                                     className={this.state.showCourses ? showCoursesClassName : hideCoursesClassName}>
                                    <div className={style["accordion-body"]}>
                                        <CourseList value={courses} addedCourses={addedCourses}
                                                    onChange={setStudentField}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style["modal-footer"]} style={{marginTop: '15px'}}>
                            <div className={style.btnGroup + ' ' + style.btnGroupMini}>
                                <button className={style.editButton} onClick={() => close()}>
                                    <span>close</span>
                                </button>
                                <button type={"button"} id={'create-btn'}
                                        className={style.accent + ' ' + style.editButton} onClick={this.saveStudent}>
                                    <span>save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressBar hidden={!this.state.showProgressBar}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        student: state.singleReducer.student,
        addedCourses: state.singleReducer.student.courses,
        courses: state.singleReducer.courses,
        schools: state.singleReducer.schools,
        mentors: state.singleReducer.mentors,
        showProgressBar: state.singleReducer.showProgressBar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setStudentField: (studentField) => dispatch(setStudentField(studentField)),
        saveStudent: (callback) => dispatch(saveStudent(callback)),
        getAllCourses: (callback) => dispatch(getAllCourses(callback)),
        getAllSchools: (callback) => dispatch(getAllSchools(callback)),
        getAllMentors: (callback) => dispatch(getAllMentors(callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentDialog);
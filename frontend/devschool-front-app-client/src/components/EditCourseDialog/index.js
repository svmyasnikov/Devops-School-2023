import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCourseField, saveCourse} from 'actions';
import ProgressBar from 'common/ProgressBar';
import style from "./EditCourseDialog.scss"
import "react-datepicker/dist/react-datepicker.css";

class EditCourseDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressBar: false
        };
    }

    saveCourseCallback = () => {
        this.setState({
            showProgressBar: false
        });
        this.props.saveCourseCallback();
    };

    saveCourse = () => {
        this.setState({
            showProgressBar: true
        });
        this.props.saveCourse(() => this.saveCourseCallback());
    };

    render() {
        const {setCourseField, close, course} = this.props;
        const closedClassName = style["modal"] + ' ' + style["fade"];
        const openClassName = closedClassName + ' ' + style["show"] + ' ' + style['openDialog'];

        return (
            <div className={this.props.isOpen ? openClassName : closedClassName} tabIndex="-1">
                <div className={style["modal-dialog"]}
                     style={{maxHeight: window.screen.height * 2 / 3, overflow: 'auto'}}>
                    <div className={style["modal-content"]}>
                        <div className={style["modal-header"]}>
                            <h5 className={style["modal-title"]} id="staticBackdropLabel">{course.id ? 'Edit course' : 'New course'}</h5>
                        </div>
                        <div className={style["modal-body"]}>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">Course name</span>
                                <input value={course.name} type="text" className={style["form-control"]}
                                       onChange={(event) => setCourseField({
                                           name: 'name',
                                           value: event.target.value
                                       })}
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>
                        </div>
                        <div className={style["modal-footer"]} style={{marginTop: '15px'}}>
                            <div className={style.btnGroup + ' ' + style.btnGroupMini}>
                                <button className={style.editButton} onClick={() => close()}>
                                    <span>close</span>
                                </button>
                                <button type={"button"} id={'create-btn'}
                                        className={style.accent + ' ' + style.editButton} onClick={this.saveCourse}>
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
        course: state.singleReducer.course
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCourseField: (courseField) => dispatch(setCourseField(courseField)),
        saveCourse: (callback) => dispatch(saveCourse(callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourseDialog);
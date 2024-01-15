import React, {Component} from 'react';
import {connect} from 'react-redux';

import CoursesList from './CoursesList';
import BaseLayout from 'common/BaseLayout';
import theme from 'theme/theme.scss';
import {getAllCourses, setCourseField, resetCourse} from 'actions';
import browserHistory from './../../history';
import * as routes from 'constants/routes';
import ProgressBar from "common/ProgressBar";
import EditCourseDialog from './../EditCourseDialog';

class CoursesDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditDialog: false,
            showProgressBar: false
        };
    }

    componentDidMount = () => {
        this.showCourses();
    };

    showCourses = () => {
        this.setState({
            showProgressBar: true
        });

        this.props.getAllCourses(() => this.setState({
            showProgressBar: false
        }));
    };

    rowClick = (row) => {
       const {setCourseField} = this.props;
        ['name', 'id', 'version'].forEach((field) => {
            setCourseField({
                name: field,
                value: row[field]
            })
        });

        this.setState({
            showEditDialog: true
        })
    };

    saveCourseCallback = () => {
        this.setState({
            showEditDialog: false
        });
        this.showCourses();
    };

    back = () => {
        browserHistory.push(routes.START_DIALOG);
    };

    render() {
        const {courses, resetCourse} = this.props;
        return (
            <BaseLayout pageTitle={"courses"}>
                <h2>{"Courses"}</h2>
                <CoursesList value={courses} onEdit={this.rowClick}/>
                <div className={theme.btnGroup + ' ' + theme.btnGroupMini}>
                    <button onClick={this.back}>
                        <span>back</span>
                    </button>
                    <button type={"button"} id={'create-btn'} className={theme.accent} onClick={() => {
                        resetCourse();
                        this.setState({
                            showEditDialog: true
                        })
                    }}>
                        <span>create</span>
                    </button>
                </div>
                {this.state.showEditDialog ? <EditCourseDialog isOpen={this.state.showEditDialog} saveCourseCallback={this.saveCourseCallback} close={() => {
                    this.setState({
                        showEditDialog: false
                    })
                }}/> : null}
                <ProgressBar hidden={!this.state.showProgressBar} />
            </BaseLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.tableReducer.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCourses: (callback) => dispatch(getAllCourses(callback)),
        setCourseField: (courseField) => dispatch(setCourseField(courseField)),
        resetCourse: () => dispatch(resetCourse())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesDialog);
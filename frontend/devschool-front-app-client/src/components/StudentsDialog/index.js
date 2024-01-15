import React, {Component} from 'react';
import {connect} from 'react-redux';

import StudentsList from './StudentsList';
import BaseLayout from 'common/BaseLayout';
import theme from 'theme/theme.scss';
import {getAllStudents, setStudentField, resetStudent} from 'actions';
import browserHistory from './../../history';
import * as routes from 'constants/routes';
import ProgressBar from "common/ProgressBar";
import EditStudentDialog from './../EditStudentDialog';

class StudentsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditDialog: false,
            showProgressBar: false
        };
    }

    componentDidMount = () => {
        this.showStudents();
    };

    showStudents = () => {
        this.setState({
            showProgressBar: true
        });

        this.props.getAllStudents(() => this.setState({
            showProgressBar: false
        }));
    };

    rowClick = (row) => {
       const {setStudentField} = this.props;
        ['courses', 'email', 'firstName', 'id', 'lastName', 'mentor', 'phone', 'school', 'version'].forEach((field) => {
            setStudentField({
                name: field,
                value: row[field]
            })
        });

        this.setState({
            showEditDialog: true
        })
    };

    saveStudentCallback = () => {
        this.setState({
            showEditDialog: false
        });
        this.showStudents();
    };

    back = () => {
        browserHistory.push(routes.START_DIALOG);
    };

    render() {
        const {students, resetStudent} = this.props;
        return (
            <BaseLayout pageTitle={"Students"}>
                <h2>{"Students"}</h2>
                <StudentsList value={students} onEdit={this.rowClick}/>
                <div className={theme.btnGroup + ' ' + theme.btnGroupMini}>
                    <button onClick={this.back}>
                        <span>back</span>
                    </button>
                    <button type={"button"} id={'create-btn'} className={theme.accent} onClick={() => {
                        resetStudent();
                        this.setState({
                            showEditDialog: true
                        })
                    }}>
                        <span>create</span>
                    </button>
                </div>
                {this.state.showEditDialog ? <EditStudentDialog isOpen={this.state.showEditDialog} saveStudentCallback={this.saveStudentCallback} close={() => {
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
        students: state.tableReducer.students,
        notification: state.tableReducer.notification,
        notificationType: state.tableReducer.notificationType,
        showProgressBar: state.tableReducer.showProgressBar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllStudents: (callback) => dispatch(getAllStudents(callback)),
        setStudentField: (studentField) => dispatch(setStudentField(studentField)),
        resetStudent: () => dispatch(resetStudent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsDialog);
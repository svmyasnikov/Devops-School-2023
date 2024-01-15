import React, {Component} from 'react';
import {connect} from 'react-redux';

import MentorsList from './MentorsList';
import BaseLayout from 'common/BaseLayout';
import theme from 'theme/theme.scss';
import {getAllMentors, setMentorField, resetMentor} from 'actions';
import browserHistory from './../../history';
import * as routes from 'constants/routes';
import ProgressBar from "common/ProgressBar";
import EditMentorDialog from './../EditMentorDialog';

class MentorsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditDialog: false,
            showProgressBar: false
        };
    }

    componentDidMount = () => {
        this.showMentors();
    };

    showMentors = () => {
        this.setState({
            showProgressBar: true
        });

        this.props.getAllMentors(() => this.setState({
            showProgressBar: false
        }));
    };

    rowClick = (row) => {
       const {setMentorField} = this.props;
        ['phone', 'email', 'firstName', 'lastName', 'id', 'version'].forEach((field) => {
            setMentorField({
                name: field,
                value: row[field]
            })
        });

        this.setState({
            showEditDialog: true
        })
    };

    saveMentorCallback = () => {
        this.setState({
            showEditDialog: false
        });
        this.showMentors();
    };

    back = () => {
        browserHistory.push(routes.START_DIALOG);
    };

    render() {
        const {mentors, resetMentor} = this.props;
        return (
            <BaseLayout pageTitle={"Mentors"}>
                <h2>{"Mentors"}</h2>
                <MentorsList value={mentors} onEdit={this.rowClick}/>
                <div className={theme.btnGroup + ' ' + theme.btnGroupMini}>
                    <button onClick={this.back}>
                        <span>back</span>
                    </button>
                    <button type={"button"} id={'create-btn'} className={theme.accent} onClick={() => {
                        resetMentor();
                        this.setState({
                            showEditDialog: true
                        })
                    }}>
                        <span>create</span>
                    </button>
                </div>
                {this.state.showEditDialog ? <EditMentorDialog isOpen={this.state.showEditDialog} saveMentorCallback={this.saveMentorCallback} close={() => {
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
        mentors: state.tableReducer.mentors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllMentors: (callback) => dispatch(getAllMentors(callback)),
        setMentorField: (mentorField) => dispatch(setMentorField(mentorField)),
        resetMentor: () => dispatch(resetMentor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorsDialog);
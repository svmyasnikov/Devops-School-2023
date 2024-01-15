import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setMentorField, saveMentor} from 'actions';
import ProgressBar from 'common/ProgressBar';
import style from "./EditMentorDialog.scss"
import "react-datepicker/dist/react-datepicker.css";

class EditMentorDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressBar: false
        };
    }

    saveMentorCallback = () => {
        this.setState({
            showProgressBar: false
        });
        this.props.saveMentorCallback();
    };

    saveMentor = () => {
        this.setState({
            showProgressBar: true
        });
        this.props.saveMentor(() => this.saveMentorCallback());
    };

    render() {
        const {setMentorField, close, mentor} = this.props;
        const closedClassName = style["modal"] + ' ' + style["fade"];
        const openClassName = closedClassName + ' ' + style["show"] + ' ' + style['openDialog'];

        return (
            <div className={this.props.isOpen ? openClassName : closedClassName} tabIndex="-1">
                <div className={style["modal-dialog"]}
                     style={{maxHeight: window.screen.height * 2 / 3, overflow: 'auto'}}>
                    <div className={style["modal-content"]}>
                        <div className={style["modal-header"]}>
                            <h5 className={style["modal-title"]} id="staticBackdropLabel">{mentor.id ? 'Edit mentor' : 'New mentor'}</h5>
                        </div>
                        <div className={style["modal-body"]}>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">first name</span>
                                <input value={mentor.firstName} type="text" className={style["form-control"]}
                                       onChange={(event) => setMentorField({
                                           name: 'firstName',
                                           value: event.target.value
                                       })}
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">last name</span>
                                <input value={mentor.lastName} type="text" className={style["form-control"]}
                                       onChange={(event) => setMentorField({
                                           name: 'lastName',
                                           value: event.target.value
                                       })}
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">e-mail</span>
                                <input value={mentor.email} type="text" className={style["form-control"]}
                                       onChange={(event) => setMentorField({
                                           name: 'email',
                                           value: event.target.value
                                       })}
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">phone</span>
                                <input value={mentor.phone} type="text" className={style["form-control"]}
                                       onChange={(event) => setMentorField({
                                           name: 'phone',
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
                                        className={style.accent + ' ' + style.editButton} onClick={this.saveMentor}>
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
        mentor: state.singleReducer.mentor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMentorField: (mentorField) => dispatch(setMentorField(mentorField)),
        saveMentor: (callback) => dispatch(saveMentor(callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMentorDialog);
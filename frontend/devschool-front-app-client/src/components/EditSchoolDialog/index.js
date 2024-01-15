import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setSchoolField, saveSchool} from 'actions';
import ProgressBar from 'common/ProgressBar';
import style from "./EditSchoolDialog.scss"
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class EditSchoolDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressBar: false
        };
    }

    saveSchoolCallback = () => {
        this.setState({
            showProgressBar: false
        });
        this.props.saveSchoolCallback();
    };

    saveSchool = () => {
        this.setState({
            showProgressBar: true
        });
        this.props.saveSchool(() => this.saveSchoolCallback());
    };

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    };


    render() {
        const {setSchoolField, close, school} = this.props;
        const closedClassName = style["modal"] + ' ' + style["fade"];
        const openClassName = closedClassName + ' ' + style["show"] + ' ' + style['openDialog'];

        return (
            <div className={this.props.isOpen ? openClassName : closedClassName} tabIndex="-1">
                <div className={style["modal-dialog"]}
                     style={{maxHeight: window.screen.height * 2 / 3, overflow: 'auto'}}>
                    <div className={style["modal-content"]}>
                        <div className={style["modal-header"]}>
                            <h5 className={style["modal-title"]} id="staticBackdropLabel">{school.id ? 'Edit school' : 'New school'}</h5>
                        </div>
                        <div className={style["modal-body"]}>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">School number</span>
                                <input value={school.number} type="text" className={style["form-control"]}
                                       onChange={(event) => setSchoolField({
                                           name: 'number',
                                           value: event.target.value
                                       })}
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"]}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">Start date</span>
                                <DatePicker dateFormat={'DD-MM-YYYY'} className={style["form-control"]} selected={moment(school.startDate)}
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={(date) => setSchoolField({
                                    name: 'startDate',
                                    value: moment(date).toISOString(true).slice(0,10)
                                })}/>
                            </div>
                            <div className={style["input-group"] + ' ' + style["mb-3"] + ' ' + style['fullDatePicker']}>
                                <span className={style["input-group-text"]}
                                      id="inputGroup-sizing-default">End date </span>
                                <DatePicker dateFormat={'DD-MM-YYYY'} className={style["form-control"]} selected={moment(school.endDate)}
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={(date) => setSchoolField({
                                    name: 'endDate',
                                    value: moment(date).toISOString(true).slice(0,10)
                                })}/>
                            </div>
                        </div>
                        <div className={style["modal-footer"]} style={{marginTop: '15px'}}>
                            <div className={style.btnGroup + ' ' + style.btnGroupMini}>
                                <button className={style.editButton} onClick={() => close()}>
                                    <span>close</span>
                                </button>
                                <button type={"button"} id={'create-btn'}
                                        className={style.accent + ' ' + style.editButton} onClick={this.saveSchool}>
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
        school: state.singleReducer.school
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSchoolField: (schoolField) => dispatch(setSchoolField(schoolField)),
        saveSchool: (callback) => dispatch(saveSchool(callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSchoolDialog);
import React, {Component} from 'react';
import {connect} from 'react-redux';

import BaseLayout from 'common/BaseLayout';
import style from './StartDialog.scss';
import browserHistory from './../../history';
import * as routes from 'constants/routes';
import student from './student.png';
import school from './school.png';
import course from './courses.png';
import mentor from './mentor.png';

class StartDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    redirect = (path) => {
        browserHistory.push(path);
    };

    render() {
        return (
            <BaseLayout pageTitle={"Students"}>
            <div className={style["frame"]}>

                <div className={style["overview"] + ' ' + style["student"]} onClick={() => this.redirect(routes.STUDENTS_DIALOG)}>
                    <div className={style["title"]}>Students</div>
                    <div className={style["operationText"]}>
                        <img src={student} style={{width: '150px'}}/>
                        <span>Operations with students</span></div>
                    <div className={style["lines"]}>
                        <div className={style["line"]} style={{width: '69px'}}></div>
                        <div className={style["line"]} style={{width: '59px'}}></div>
                        <div className={style["line"]} style={{width: '66px'}}></div>
                        <div className={style["line"]} style={{width: '46px'}}></div>
                    </div>
                </div>

                <div className={style["overview"] + ' ' + style["course"]} onClick={() => this.redirect(routes.COURSES_DIALOG)}>
                    <div className={style["title"]}>Courses</div>
                    <div className={style["operationText"]}>
                        <img src={course} style={{width: '150px', margin: '9px'}}/>
                        <span>Operations with courses</span></div>
                    <div className="lines">
                        <div className={style["line"]} style={{width: '69px'}}></div>
                        <div className={style["line"]} style={{width: '59px'}}></div>
                        <div className={style["line"]} style={{width: '66px'}}></div>
                        <div className={style["line"]} style={{width: '46px'}}></div>
                    </div>
                </div>

                <div className={style["overview"] + ' ' + style["school"]} onClick={() => this.redirect(routes.SCHOOLS_DIALOG)}>
                    <div className={style["title"]}>Schools</div>
                    <div className={style["operationText"]}>
                        <img src={school} style={{width: '150px'}}/>
                        <span>Operations with schools</span></div>
                    <div className={style["lines"]}>
                        <div className={style["line"]} style={{width: '69px'}}></div>
                        <div className={style["line"]} style={{width: '59px'}}></div>
                        <div className={style["line"]} style={{width: '66px'}}></div>
                        <div className={style["line"]} style={{width: '46px'}}></div>
                    </div>
                </div>

                <div className={style["overview"] + ' ' + style["mentor"]} onClick={() => this.redirect(routes.MENTORS_DIALOG)}>
                    <div className={style["title"]}>Mentors</div>
                    <div className={style["operationText"]}>
                        <img src={mentor} style={{width: '150px'}}/>
                        <span>Operations with mentors</span></div>
                    <div className={style["lines"]}>
                        <div className={style["line"]} style={{width: '69px'}}></div>
                        <div className={style["line"]} style={{width: '59px'}}></div>
                        <div className={style["line"]} style={{width: '66px'}}></div>
                        <div className={style["line"]} style={{width: '46px'}}></div>
                    </div>
                </div>
            </div>
            </BaseLayout>
        );
    }
}

export default connect()(StartDialog);
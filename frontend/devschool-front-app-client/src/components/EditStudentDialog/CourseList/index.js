import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from "../EditStudentDialog.scss";

/**
 *
 */
export default class CourseList extends Component {

    render() {
        return (
            <ul className={style["list-group"] + ' ' + style["list-group-flush"]}>
                {this.props.value.map((value, index) => (
                        <li key={index} className={style["list-group-item"]}>
                            <div className={style["form-check"] + ' ' + style["form-switch"]}
                                 style={{float: "left"}}>
                                <label className={style["form-check-label"]}>{value.name}</label>
                                <input className={style["form-check-input"]} type="checkbox"
                                       checked={this.props.addedCourses.find(c => c.course.id == value.id)}
                                       id="flexSwitchCheckDefault" onChange={(event => {
                                    const course = {
                                        "course": {
                                            "name": value.name,
                                            "id": value.id
                                        },
                                        "mark": 0
                                    };

                                    let courses = [...this.props.addedCourses];
                                    if (event.target.checked) {
                                        courses.push(course);
                                    } else {
                                        courses = courses.filter(c => c.course.id != value.id);
                                    }

                                    this.props.onChange({
                                        name: 'courses',
                                        value: courses
                                    });
                                })}/>
                            </div>
                            <div className={style["form-check"] + ' ' + style["form-switch"]} style={{float: "right"}}>
                                <label className={style["form-check-label"]}>passed</label>
                                <input className={style["form-check-input"]} type="checkbox"
                                       checked={this.props.addedCourses.find(c => c.course.id == value.id) && this.props.addedCourses.find(c => c.course.id == value.id).mark}
                                       disabled={!this.props.addedCourses.find(a => a.course.id == value.id)}
                                       onChange={(event => {
                                           const course = {
                                               "course": {
                                                   "name": value.name,
                                                   "id": value.id
                                               },
                                               "mark": event.target.checked ? 1 : 0
                                           };

                                           let courses = [...this.props.addedCourses];
                                           courses = courses.filter(c => c.course.id != value.id);
                                           courses.push(course);

                                           this.props.onChange({
                                               name: 'courses',
                                               value: courses
                                           });
                                       })}/>
                            </div>
                        </li>
                    )
                )
                }
            </ul>
        );
    }
}

CourseList.propTypes = {

    /**
     *
     */
    value: PropTypes.array.isRequired
};
import React, {Component} from 'react';
import {connect} from 'react-redux';

import SchoolList from './SchoolsList';
import BaseLayout from 'common/BaseLayout';
import theme from 'theme/theme.scss';
import {getAllSchools, setSchoolField, resetSchool} from 'actions';
import browserHistory from './../../history';
import * as routes from 'constants/routes';
import ProgressBar from "common/ProgressBar";
import EditSchoolDialog from './../EditSchoolDialog';

class SchoolDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditDialog: false,
            showProgressBar: false
        };
    }

    componentDidMount = () => {
        this.showSchools();
    };

    showSchools = () => {
        this.setState({
            showProgressBar: true
        });

        this.props.getAllSchools(() => this.setState({
            showProgressBar: false
        }));
    };

    rowClick = (row) => {
       const {setSchoolField} = this.props;
        ['number', 'startDate', 'endDate', 'id', 'version'].forEach((field) => {
            setSchoolField({
                name: field,
                value: row[field]
            })
        });

        this.setState({
            showEditDialog: true
        })
    };

    saveSchoolCallback = () => {
        this.setState({
            showEditDialog: false
        });
        this.showSchools();
    };

    back = () => {
        browserHistory.push(routes.START_DIALOG);
    };

    render() {
        const {schools, resetSchool} = this.props;
        return (
            <BaseLayout pageTitle={"Schools"}>
                <h2>{"Schools"}</h2>
                <SchoolList value={schools} onEdit={this.rowClick}/>
                <div className={theme.btnGroup + ' ' + theme.btnGroupMini}>
                    <button onClick={this.back}>
                        <span>back</span>
                    </button>
                    <button type={"button"} id={'create-btn'} className={theme.accent} onClick={() => {
                        resetSchool();
                        this.setState({
                            showEditDialog: true
                        })
                    }}>
                        <span>create</span>
                    </button>
                </div>
                {this.state.showEditDialog ? <EditSchoolDialog isOpen={this.state.showEditDialog} saveSchoolCallback={this.saveSchoolCallback} close={() => {
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
        schools: state.tableReducer.schools
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSchools: (callback) => dispatch(getAllSchools(callback)),
        setSchoolField: (schoolField) => dispatch(setSchoolField(schoolField)),
        resetSchool: () => dispatch(resetSchool())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDialog);
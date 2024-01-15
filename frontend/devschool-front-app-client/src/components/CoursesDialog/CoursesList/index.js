import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './../../../common/Table';

/**
 *
 */
export default class CoursesList extends Component {

    columns = [
        { key: 'name', title: 'name'}
    ];

    render() {
        const {value} = this.props;
        return (
            <div>
              <Table value={value} columns={this.columns} onClick={this.props.onEdit}/>
            </div>
        );
    }
}

CoursesList.propTypes = {
    value: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired
};
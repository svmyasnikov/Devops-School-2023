import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './../../../common/Table';

/**
 *
 */
export default class SchoolsList extends Component {

    columns = [
        { key: 'number', title: 'number'},
        { key: 'startDate', title: 'start date'},
        { key: 'endDate', title: 'end date'}
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

SchoolsList.propTypes = {
    value: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired
};
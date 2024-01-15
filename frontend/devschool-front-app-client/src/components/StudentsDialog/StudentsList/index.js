import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './../../../common/Table';

/**
 *
 */
export default class StudentsList extends Component {

    columns = [
        { key: 'firstName', title: 'first name'},
        { key: 'lastName', title: 'last name'},
        { key: 'email', title: 'e-mail'},
        { key: 'phone', title: 'phone'}
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

StudentsList.propTypes = {
    value: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired
};
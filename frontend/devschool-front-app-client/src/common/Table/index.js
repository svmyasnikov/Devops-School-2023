import React from 'react'
import PropTypes from 'prop-types';
import style from "./Table.scss";

export default class Table extends React.Component {


    render() {
        let height = 400;

        return (
            <div style={{height:height + 'px', overflow: 'auto', border: 1 + 'px solid #ccc', borderRadius: 2 + 'px', padding: 25 + 'px'}}>
            <table className={style.table + ' ' + style['table-hover']}>
                <thead>
                <tr>
                    {
                        this.props.columns.map((column, index) => (
                            (<th key={index}>{column.title}</th>))
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {
                    this.props.value ? this.props.value.map((value, index) => (
                            <tr key={index} onClick={() => this.props.onClick(value)}>
                                {
                                    this.props.columns.map((column, index) => (
                                        <td key={index}>{value[column.key]}</td>
                                    ))
                                }
                            </tr>
                        )
                    ) : ''
                }
                </tbody>
            </table>
            </div>
        );
    }
}

Table.propTypes = {
    columns: PropTypes.array,
    value: PropTypes.array,
    onClick: PropTypes.func
};
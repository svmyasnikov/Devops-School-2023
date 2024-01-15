import React from 'react'
import PropTypes from 'prop-types';
import style from './ProgressBar.scss';

export default class ProgressBar extends React.Component{

    render() {
        if (!this.props.hidden) {
            return (
                <div className={style.cover}>
                    <div className={style.loader}>Loading...</div>
                </div>
            );
        } else {
            return null;
        }
    }
}

ProgressBar.propTypes = {
    hidden: PropTypes.bool
};
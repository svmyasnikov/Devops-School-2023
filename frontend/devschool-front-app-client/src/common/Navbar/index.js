import React, {Component} from 'react';
import style from './Navbar.scss';

import connect from "react-redux/es/connect/connect";

class Navbar extends Component {

    render() {
        return (
            <nav
                className={style["navbar"] + ' ' + style["navbar-light"] + ' ' + style["bg-light"] + ' ' + style["justify-content-between"] + ' ' + style.magentaNav}>
                <a className={style["navbar-brand"]}>DevOps School application</a>
            </nav>);
    }
}

Navbar.propTypes = {
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(Navbar);
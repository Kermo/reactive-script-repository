import React from "react";
import logo from "../img/logo.svg";
import "../css/Header.css";

class Header extends React.Component {
    render() {
        return (
            <div>
                <img src={logo} alt="logo" className="logo"/>
                <span className="companyName">Jani Software</span>
            </div>
        );
    }
}

export default Header;
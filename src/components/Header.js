import React from "react";
import logo from "../img/logo.svg";
import "./Header.css";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <img src={logo} alt="logo" className="logo"/>
                <span className="companyName">Jani Software</span>
            </div>
        );
    }
}

export default Header;
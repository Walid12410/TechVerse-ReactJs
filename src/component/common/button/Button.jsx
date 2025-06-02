import React from "react";
import "./button.css"; // We'll put the CSS here
import { Link } from "react-router-dom";

const Button = ({ children, path }) => {
    return (
        <Link
            to={path}
            className="button">
            <div className="blob1"></div>
            <div className="blob2"></div>
            <div className="inner"
                style={{ fontFamily: "CelabRegular, sans-serif" }}
            >{children}</div>
        </Link>
    );
};

export default Button;
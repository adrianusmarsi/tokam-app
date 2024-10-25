import React from "react";
import './Header.css'

function Header(){
    return(
        <header className="header">
            <div className="overlay">
            <h1>Coffee Shop Example</h1>
            <nav>
                <a href="#about">About Us</a>
                <a href="#menu">Our Coffee</a>
                <a href="#contact">Contact Us</a>
            </nav>
            </div>
        </header>
    );
}

export default Header;
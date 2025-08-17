import React from "react";
import Nav from "../componants/Nav.js"
import Hero from "./Hero.js";
import "../styles/home.css"

const Home = () => {
    return (
        <div className="home-page">
            <nav className="nav-bar">
                <Nav />
            </nav>
            <div className="heroSection">
                <Hero />
            </div>
        </div>
    );
};

export default Home;

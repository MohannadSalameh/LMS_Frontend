import style from "./HomeHeader.module.css"
import logo from "../../../assets/images/evolve-logo.svg";
import React from "react";
import { Link } from "react-router-dom";
function Header() {

    return (
        <>
         <header className={style.header}>
                        <nav className={style.nav}>
                            <div className={style.rightHeader}>
                                <img className={style.img} src={logo} alt="Evolve Logo" />
                                <input
                                    type="search"
                                    placeholder="🔍 Search courses..."
                                    className={style.searchCours}
                                />
                            </div>
                            <div className={style.leftHeader}>
                                <Link to="/student/main">Home</Link>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Rigester</Link>
                                <Link to="/courses">Discover Courses</Link>
                                <Link to="/contact">Contact Us</Link>
                            </div>
                        </nav>
                    </header>
        </>
)

}

export default Header;
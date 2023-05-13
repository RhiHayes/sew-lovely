import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";
import sewingLogo from "./images/sewingLogo.png"
const Home = () => {
    return (
        <>
        <div className={classes.home}>
            <h1 className={`${classes.title} ${classes.fade_in_1}`}>Sew Lovely</h1>
            <p className={`${classes.slogan} ${classes.fade_in_2}`}>Where you feel like <i>you.</i></p>
            <div className={classes.container}>
            <img className={classes.image} src={sewingLogo}/>
            </div>
            <div className={classes.container}>
            <NavLink to="/products">
            <button className={`${classes.btn_find}`}>Find yourself →</button>
              </NavLink>
            </div>
        </div>
        </>
    )
}

export default Home;
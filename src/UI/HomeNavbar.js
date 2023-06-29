import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';

import classes from "./HomeNavbar.module.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const HomeNavbar = () => {

  const state = useSelector((state) => state.handleCart);
  let cartNum = state.reduce(function (acc, obj) { return acc + obj.qty; }, 0);

  return (
    <Navbar className={classes.navbar}>
        <Container>
        <Navbar.Brand>
        <NavLink className={classes.nav_title} to="/">
            Sew Lovely
          </NavLink>
        </Navbar.Brand>
        <Nav className={`${classes.nav_item} me-auto`}>
          <Nav.Link className={`${classes.nav_link} mt-2`}> 
            <NavLink aria-current="page" to="/">
                  Home
              </NavLink>
            </Nav.Link>
            <Nav.Link className={`${classes.nav_link} mt-2`}>
            <NavLink to="/products">
                  Products
              </NavLink>
            </Nav.Link>
        </Nav>
        <Nav.Link className={`${classes.nav_link} mt-2`}>
            <NavLink to="/cart" className={`${classes.cart}`}>
                <i className="fa fa-shopping-cart me-1"></i>
                Cart ({cartNum})
              </NavLink>
        </Nav.Link>
      </Container>
      </Navbar>
  );
};

export default HomeNavbar;

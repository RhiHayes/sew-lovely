import React from 'react';
import { NavLink } from "react-router-dom";
import Col from 'react-bootstrap/Col';

import classes from "./PDPProduct.module.css"

const PDPProduct = (props) => {
  return (
    <>
    <Col sm={6} md={6} lg={4} xl={4} className={classes.container}>
      <h2 className={classes.title}>{props.title}</h2>
      <div>
      <span className={classes.price}><strike>${parseFloat(props.msrp).toFixed(2)}</strike></span>
      <span className={classes.new_price}>&nbsp;${parseFloat(props.price).toFixed(2)}</span>
      </div>
      <img className={classes.image} src={props.image} width="350" height="550" />
      <br />
      <NavLink to={{ pathname:"/product/" +  `${props.sku}` }}>
      <button className={classes.btn_buy}>Buy Now</button>
      </NavLink>
      </Col>
    </>
  );
};

export default PDPProduct;
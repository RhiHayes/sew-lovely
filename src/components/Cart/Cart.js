import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCart, deleteCart } from "../../redux/action"
import classes from "./Checkout.module.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cart = () => {

  const state = useSelector((state) => state.handleCart);
  const total = state.reduce(function (acc, obj) { return acc + obj.qty * obj.price; }, 0);
  console.log(total)

  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addCart(item));
  };
  const handleDelete = (item) => {
    dispatch(deleteCart(item));
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 py-5">
        <div className="container py-4">
          <div className="row">
            <h3 className={classes.empty}>Your Cart is Empty!</h3>
          </div>
        </div>
      </div>
    );
  };

  const cartItems = (product) => {

    return (
      <>
       <Container className={classes.checkout_container}>
      <Row className={classes.checkout_row}>
      <Col sm={6} md={6} lg={3}>
                <img
                  src={product.image}
                  alt={product.title}
                  height="350px"
                  width="250px"
                />
        </Col>
        <Col sm={6} md={6} lg={3}>
                <h4><strong>{product.title}</strong></h4>
                {product.selected_size && <div className={classes.single_size}>SIZE: {product.selected_size}</div>}
                <p className={classes.single_price}>PRICE:  ${parseInt(product.price).toFixed(2)}</p>
            </Col>
            <Col sm={6} md={6} lg={3}>
            <h5>Quantity</h5>
                <p>
                  {product.qty} 
                </p>
                <button
                  className={classes.quantity_btn}
                  onClick={() => handleDelete(product)}
                >
                  <i className="minus">-</i>
                </button>
                <button
                  className={classes.quantity_btn}
                  disabled={parseFloat(product.quantity_available) >= product.qty + 1 ? false : true}
                  onClick={() => handleAdd(product)}
                >
                  <i className="plus">+</i>
                </button>
                {parseFloat(product.quantity_available) >= product.qty + 1 ? ('') : (
                  <div className={classes.max_amount}>You added the maximum amount of this product!</div>
                )}
              </Col>
              <Col sm={6} md={6} lg={3}>
                <h5>Total</h5>
                <p>${(product.qty * product.price).toFixed(2)}</p>
              </Col>
         </Row>
         </Container>
      </>
    );
  };

  const buttons = () => {
    return (
      <>
        <Container className={classes.checkout_container}>
        <Row>
          <p className={classes.total_amount}>Total: <span className={classes.total_price}>${total.toFixed(2)}</span></p>
            <NavLink to="/checkout">
            <button className={classes.checkout_btn}>
              Proceed to Checkout
              </button>
            </NavLink>
            </Row>
         </Container>
      </>
    );
  };

  return (
    <div>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && buttons()}
    </div>
  );

}

export default Cart 
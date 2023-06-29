import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../../redux/action';
import useHasChanged from '../../../hooks/use-has-changed.tsx';
import useFirstRender from '../../../hooks/use-first-render.tsx';

import classes from "./PLPProduct.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PLPProduct = (props) => {

  const [active, setActive] = useState(null)
  const cart = useSelector((cart) => cart.handleCart);
  const firstRender = useFirstRender()
  let cartNum = cart.reduce(function (acc, obj) { return acc + obj.qty; }, 0);

  //Check if these values have changed
  const activeHasChanged = useHasChanged(active)
  const cartNumHasChanged = useHasChanged(cartNum)

  useEffect(() => {

    if (cartNumHasChanged && !firstRender) {
      alert("Added to cart!")
    } else if(activeHasChanged) {
     return;
    } else {
      alert("WOAH! You added the maximum amount of this product!")
    }
  });

  //For products with sizes
  const updatedSku = active ? props.sku + "-" + active : props.sku;

  const dispatch = useDispatch();
  const addProduct = (props) => {
      dispatch(addCart({
        ...props,
        sku: updatedSku,
        selected_size: active
      }));
  }

  let qty_wording = ""

  if(+props.quantity_available <= 10 && +props.quantity_available != 1 && +props.quantity_available != 0) {
    qty_wording = 
    <p style={{fontSize: 20 + "px", 
    fontWeight: "bold",
    marginTop: 15 + "px"}}>
    Only {props.quantity_available} left!</p>
  } else if(+props.quantity_available == 1) {
    qty_wording = <p style={{fontSize: 20 + "px", 
    fontWeight: "bold",
    marginTop: 15 + "px",
    color: "red"
    }} className={classes.wording}>LAST ONE!</p>
  } else if(+props.quantity_available == 0) {
    qty_wording = <p style={{fontSize: 20 + "px", 
    fontWeight: "bold",
    marginTop: 15 + "px",
    color: "red"
    }}>OUT OF STOCK!</p>
  } else {
    qty_wording = <p style={{fontSize: 20 + "px", 
    fontWeight: "bold",
    marginTop: 15 + "px"
    }}>{props.quantity_available} available</p>
  }

  return (
    <Container>
    <Row>
    <Col md={12} lg={12} xl={6} className={classes.img_container}>
      <img src={props.image} className={classes.single_image} />
      </Col>
      <Col md={12} lg={12} xl={5} className={classes.container}>
      <h2 className={classes.single_title}>{props.title}</h2>
      <span className={classes.single_price}><strike>${parseFloat(props.msrp).toFixed(2)}</strike></span>
      <span className={classes.single_new_price}>&nbsp;${parseFloat(props.price).toFixed(2)}</span>
      <div>{qty_wording}</div>
      <h3 className={classes.brand}>{props.brand}</h3>
      <p className={classes.desc}>{props.description}</p>
      <br />
      {props.sizes?.map((size) => (
        <span className={classes.btn_container}>
        <button onClick={() => setActive(size)}
        className={`${classes.size_btn} ${active == size ? classes.active_val : 'not-selected'}`}
        >{size}</button>
        </span>
      ))}
      <br />
      <br />
      {+props.quantity_available != 0 ? 
      <button disabled={active == null && props.sizes ? true : false}
            className={classes.cart_btn}
            onClick={() => addProduct(props)}
          >
            Add to Cart
          </button> : 
          <button disabled="true"
            className={classes.cart_btn}
          >
            Out of Stock
          </button>} 

                   <NavLink to="/cart" className={classes.go_to_cart_btn}>
                       Go To Cart
                   </NavLink>
      </Col>
      </Row>
    </Container>
  );
};

export default PLPProduct;
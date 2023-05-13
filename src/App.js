import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from './UI/Home';
import ProductList from './components/Products/PLP/ProductList';
import Products from './components/Products/PDP/Products';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';

import Navbar from './UI/HomeNavbar';
 
function App() {

  return (
    <>
   <Navbar />
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/product/:sku" component={ProductList}/>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
    </Switch>
     </>
  );
}

export default App;

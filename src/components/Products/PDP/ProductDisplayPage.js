import React from 'react';
import PDPProduct from './PDPProduct';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ProductDisplayPage = (props) => {
    return (
      <Container>
      <Row>
        {props.products.map((product) => (
          <>
          <PDPProduct
            id={product.id}
            sku={product.sku}
            title={product.title}
            image={product.image}
            price={product.price}
            msrp={product.msrp}
            url={product.url}
          />
          </>
        ))}
        </Row>
      </Container>
    );
  };
  
  export default ProductDisplayPage;
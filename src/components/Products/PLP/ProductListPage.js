import React from 'react';

import PLPProduct from './PLPProduct';

const ProductListPage = (props) => {
    return (
      <ul>
        {props.products.map((product) => (
          <>
          <PLPProduct
            id={product.id}
            sku={product.sku}
            title={product.title}
            image={product.image}
            price={product.price}
            msrp={product.msrp}
            url={product.url}
            description={product.description}
            brand={product.brand}
            quantity_available={product.quantity_available}
            sizes={product.sizes}
          />
          </>
        ))}
      </ul>
    );
  };
  
  export default ProductListPage;
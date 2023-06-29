import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import Loader from '../../../UI/Loader';

import ProductListPage from './ProductListPage';

const ProductList = () => {

    const {sku} = useParams();
    const [loading, setLoading] = useState(false);
    const [product ,setProduct] = useState([]);

    const fetchProduct = useCallback(async () => {
      setLoading(true)

        try {
            const response = await fetch(`https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=${sku}`);
      
            if(!response.ok) {
              throw new Error("Something went wrong :(")
            }
      
            const data = await response.json();
            console.log("DATA", data)

            const transformedProducts = data.results.map( result =>
              {
                return ({
                  id: result.id,
                  sku: result.sku,
                  title: result.title,
                  image: result.imageUrl,
                  price: result.price,
                  msrp: result.msrp,
                  url: result.url,
                  description: result.description,
                  brand: result.brand,
                  quantity_available: result.quantity_available,
                  sizes: result.size,
                });    
              }
            );

            setProduct(transformedProducts)
            
          } catch (error) {
            console.log(error)
        }

     setLoading(false);
      }, []);

      useEffect(() => {
        fetchProduct();
      }, [fetchProduct]);

      let content = <p>Found no products</p>

      if(product.length > 0) {
        content = <ProductListPage products={product}/>
       }
 
       if(loading) {
         content = <Loader />
       }

        return (
            <div>{content}</div>
          );

}

export default ProductList;
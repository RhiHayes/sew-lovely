import React, { useState, useEffect, useCallback } from 'react';
import ProductDisplayPage from './ProductDisplayPage';
import Filters from '../../Filters/Filters';
import Loader from '../../../UI/Loader';

import classes from "./Products.module.css";

const Products = () => {

    const [loading, setLoading] = useState(false);
    const [products ,setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(1);
    const [hideFilters, setHideFilters] = useState(true);
    const [filters, setFilters] = useState({});
    const [activeFilterValues, setActiveFilterValues] = useState({});
    const [activeFilters, setActiveFilters] = useState([])
    const [pageData, setPageData] = useState({});

    function isObjEmpty (obj) {
      return Object.keys(obj).length === 0;
  }

  let isEmpty = isObjEmpty(activeFilterValues)

    useEffect(() => {
      fetchProducts(currentPage);
    }, [query, currentPage, activeFilterValues]);

    const fetchProducts = useCallback(async () => {

      setLoading(true)

        try {

          let selectedFilters = '';
          let itFilters = '';
          let itFiltersArr = []
          let response;

          //Need to check for 1, 2 and 3+
          if(activeFilterValues.activeFac != undefined && activeFilters.length == 0) {
            selectedFilters = "&filter." + activeFilterValues.activeFac + "=" + activeFilterValues.activeVal;
          } else if(activeFilters.length == 1) {
            if(activeFilterValues.activeFac == activeFilters[0].activeFac) {
              //if there's a duplicate, then remove older entry
              activeFilters.pop();
              selectedFilters = "&filter." + activeFilterValues.activeFac + "=" + activeFilterValues.activeVal
            } else {
              selectedFilters = "&filter." + activeFilterValues.activeFac + "=" + activeFilterValues.activeVal + "&filter." + activeFilters[0].activeFac + "=" + activeFilters[0].activeVal
            }
          } else if(activeFilters.length > 1) {
            for(let i = 0; i < activeFilters.length; i++) {
              if(activeFilters[i].activeFac.includes(activeFilterValues.activeFac)) {
                //if there's a duplicate, then remove older entry
                activeFilters.pop();
                if(activeFilters.length == 2) {
                  //run if after pop the length is 2
                  selectedFilters = "&filter." + activeFilterValues.activeFac + "=" + activeFilterValues.activeVal
                }
              } else {
                //run if after pop the length is greater than 2
                itFilters += "&filter." + activeFilters[i].activeFac + "=" + activeFilters[i].activeVal;
                selectedFilters = "&filter." + activeFilterValues.activeFac + "=" + activeFilterValues.activeVal + itFilters;
              }
            }
          }

          if(selectedFilters) {
            response = await fetch(`https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=${query}&page=${currentPage}` + selectedFilters);
          } else {
            response = await fetch(`https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=${query}&page=${currentPage}`);
          }

          console.log("AFV --- INSIDE", activeFilterValues)
          console.log("ACTIVE FILTERS --- INSIDE", activeFilters)
      
            if(!response.ok) {
              throw new Error("Something went wrong :(")
            }
      
            const data = await response.json();

            const transformedProducts = data.results.map(result =>
              {
                return ({
                  id: result.id,
                  sku: result.sku,
                  title: result.title,
                  image: result.imageUrl,
                  price: result.price,
                  msrp: result.msrp,
                  url: result.url,
                });    
              }
            );

            const transformedFilters = data.facets.map(filter =>
              {
                return ({
                  field: filter.field,
                  label: filter.label,
                  type: filter.type,
                  facet_active: filter.facet_active,
                  range: filter.range,
                  values: filter.values,
                });    
              }
            );

            setPageData(data.pagination);
            setProducts(transformedProducts)
            setFilters(transformedFilters)
            
          } catch (error) {
            console.log(error)
        }

     setLoading(false);
     if(!isEmpty) {
      setActiveFilters(filters => [...filters, activeFilterValues])
     }
      }, [query, currentPage, activeFilterValues, activeFilters]);

      const updateSearch = (e) => {
        setSearch(e.target.value)
      }

      const getSearch = (e) => {
        e.preventDefault();
        setQuery(search)
        setSearch('')
      }


      const prevPageHandler = () => {
        setCurrentPage(pageData.currentPage - 1)
      }

      const nextPageHandler = () => {
        setCurrentPage(pageData.currentPage + 1)
      }

      const onOptionChangeHandler = (fac, label) => (event) => {
          setActiveFilterValues({
            active: true,
            activeFac: fac,
            activeLabel: label,
            activeVal: event.target.value,
        })
    }

  const clearFilters = () => {
    setActiveFilterValues({})
    setActiveFilters([])
  }

  const unhideFilters = () => {
    setCount(count + 1)

    if(count % 2 == 0) {
      setHideFilters(true)
    } else {
      setHideFilters(false)
    }
  }

      return (
        <>
        {products.length == 0 && !loading && <p className={classes.results_num_verbiage}>Sorry, we couldn't find anything...</p>}
        {query.length == 0 && products.length != 0 && <p className={classes.results_num_verbiage}><span className={classes.result_num}>{pageData.totalResults - 1}</span> results in our catalog!</p>}
        {query.length != 0 && <p className={classes.results_num_verbiage}><span className={classes.result_num}>{pageData.totalResults - 1}</span> results for "{query}"</p>}
        <div className={classes.container}>
        <form onSubmit={getSearch}>
            <button className={classes.btn_filter} type="button" onClick={unhideFilters}>Filter <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
            <input className={classes.search_bar} type="text" value={search} onChange={updateSearch} placeholder="Find your style..."/>
            <button className={classes.btn_search} type="submit">Search&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg></button>
         </form>
        </div>
        {loading ? <Loader /> : ''}
        {products.length > 0 && !loading && 
        <div>
        <div>
          {activeFilterValues.activeLabel && 
          <>
         <div>
         <div className={classes.enabled_filters}>
         {activeFilters.map((filter) =>
          <div>{filter.activeLabel} : {filter.activeVal} ✓</div>
         )}
         <br />
         <button className={classes.clear_btn} onClick={clearFilters}>Clear Filters ✗</button>
         </div>
         </div>
         </>}
        </div>
        {!hideFilters && <Filters filters={filters} onChange={onOptionChangeHandler}/>}
        <ProductDisplayPage products={products} />
        <div className={classes.pagination_container}>
        <p className={classes.results_num_verbiage}>Page <span className={classes.result_num}>{pageData.currentPage}</span> of <span className={classes.result_num}>{pageData.totalPages}</span></p>
        {pageData.previousPage !== 0 && <button className={classes.pagination_btn} value={pageData.previousPage} onClick={prevPageHandler}>←</button>}
        {pageData.nextPage !== 0 && <button className={classes.pagination_btn} value={pageData.nextPage} onClick={nextPageHandler}>→</button>}
        </div>
        </div>}
        </>
      )
}

export default Products; 
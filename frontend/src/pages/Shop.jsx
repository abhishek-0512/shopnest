import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/product.css";


const Shop = () => {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  const [searchParams, setSearchParams] = useSearchParams();


  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );


  const [category, setCategory] = useState("All");


  const [sort, setSort] = useState("latest");









  useEffect(() => {


    const fetchProducts = async () => {


      try {


        const res = await fetch(

          `${import.meta.env.VITE_API_URL}/api/products`

        );


        if(!res.ok){

          throw new Error(
            "Failed to fetch products"
          );

        }


        const data = await res.json();


        setProducts(

          Array.isArray(data)
          ?
          data
          :
          []

        );


      }

      catch(error){


        console.log(error);

        setProducts([]);


      }

      finally{


        setLoading(false);


      }


    };


    fetchProducts();


  }, []);









  // SEARCH WITH URL UPDATE


  const handleSearch = (e) => {


    const value = e.target.value;


    setSearch(value);



    if(value.trim()){


      setSearchParams({

        search:value

      });


    }

    else{


      setSearchParams({});


    }


  };









  // DYNAMIC CATEGORIES


  const categories = [

    "All",

    ...new Set(

      products.map(

        (product)=>

        product.category

      )

    )

  ];









  let filteredProducts = products.filter(

    (product)=>{


      const keyword =

        search

        .toLowerCase()

        .trim();





      const matchSearch =


        product.name
        ?.toLowerCase()
        .includes(keyword)


        ||

        product.brand
        ?.toLowerCase()
        .includes(keyword)


        ||

        product.category
        ?.toLowerCase()
        .includes(keyword);







      const matchCategory =


        category==="All"

        ||

        product.category===category;





      return (

        matchSearch &&

        matchCategory

      );


    }

  );









  // SORT WITHOUT MUTATING ORIGINAL ARRAY


  filteredProducts = [...filteredProducts];





  if(sort==="low"){


    filteredProducts.sort(

      (a,b)=>

      a.price-b.price

    );


  }





  else if(sort==="high"){


    filteredProducts.sort(

      (a,b)=>

      b.price-a.price

    );


  }





  else if(sort==="rating"){


    filteredProducts.sort(

      (a,b)=>

      (b.rating || 0)

      -

      (a.rating || 0)

    );


  }





  else{


    filteredProducts.sort(

      (a,b)=>

      new Date(b.createdAt)

      -

      new Date(a.createdAt)

    );


  }









  const clearFilters = () => {


    setSearch("");

    setCategory("All");

    setSort("latest");

    setSearchParams({});


  };









  return (


    <div className="shop-container">







      <div className="shop-header">


        <div>


          <h2>

            All Products

          </h2>


          <p>

            {filteredProducts.length}

            {" "}

            products available

          </p>


        </div>


      </div>









      <input


        className="search-bar"


        placeholder="Search products..."


        value={search}


        onChange={handleSearch}


      />









      <div className="shop-layout">







        <aside className="filter-box">


          <h3>

            Filters

          </h3>








          <h4>

            Category

          </h4>



          {

            categories.map(

              (item)=>(


                <label key={item}>


                  <input

                    type="radio"

                    name="category"

                    checked={category===item}

                    onChange={()=>setCategory(item)}

                  />


                  {item}


                </label>


              )


            )

          }








          <h4>

            Sort By

          </h4>




          <select

            value={sort}

            onChange={(e)=>

              setSort(e.target.value)

            }

          >


            <option value="latest">

              Latest

            </option>


            <option value="low">

              Price Low To High

            </option>


            <option value="high">

              Price High To Low

            </option>


            <option value="rating">

              Top Rated

            </option>


          </select>








          <button

            className="clear-filter-btn"

            onClick={clearFilters}

          >

            Clear Filters

          </button>



        </aside>









        {

          loading ?


          (

            <div className="loading-container">

              Loading products...

            </div>


          )


          :


          (

            <div className="product-grid">


              {

                filteredProducts.length > 0 ?


                filteredProducts.map(

                  (product)=>(


                    <ProductCard

                      key={product._id}

                      product={product}

                    />


                  )

                )


                :


                (

                  <div className="loading-container">

                    No products found 😕

                  </div>

                )


              }


            </div>


          )


        }





      </div>





    </div>


  );


};


export default Shop;
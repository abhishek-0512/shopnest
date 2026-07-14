import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";

import "../styles/addproduct.css";


const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";



const AddProduct = () => {


  const { user } = useContext(AuthContext);

  const navigate = useNavigate();




  const [formData,setFormData] = useState({

    name:"",
    description:"",
    price:"",
    category:"",
    brand:"",
    stock:"",

  });



  const [image,setImage] = useState(null);

  const [preview,setPreview] = useState(null);

  const [loading,setLoading] = useState(false);






  useEffect(()=>{


    if(!user || user.role !== "admin"){

      navigate("/");

    }


  },[user,navigate]);









  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value,

    });


  };









  const handleImage=(e)=>{


    const file=e.target.files[0];


    setImage(file);



    if(file){

      setPreview(

        URL.createObjectURL(file)

      );

    }


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();




    if(!image){


      toast.error(

        "Please select an image"

      );


      return;


    }






    setLoading(true);






    try{



      const data = new FormData();





      Object.keys(formData).forEach((key)=>{


        data.append(

          key,

          formData[key]

        );


      });





      data.append(

        "image",

        image

      );









      const res = await fetch(

        `${API_URL}/api/products`,

        {


          method:"POST",


          headers:{


            Authorization:

            `Bearer ${user.token}`,



          },


          body:data,


        }


      );









      const result = await res.json();









      if(!res.ok){



        toast.error(

          result.message ||

          "Failed to create product"

        );



        return;



      }








      toast.success(

        "Product created successfully 🚀"

      );



      navigate("/shop");







    }



    catch(err){



      console.log(err);



      toast.error(

        "Something went wrong"

      );



    }



    finally{


      setLoading(false);


    }


  };











  return (


    <div className="add-product-container">


      <div className="add-product-card">



        <div className="admin-heading">


          <FiPackage />


          <h1>
            Add New Product
          </h1>


        </div>








        <form

          onSubmit={handleSubmit}

          className="product-form"

        >






          <input

            name="name"

            placeholder="Product Name"

            value={formData.name}

            onChange={handleChange}

            required

          />







          <textarea

            name="description"

            placeholder="Product Description"

            value={formData.description}

            onChange={handleChange}

            required

          />









          <div className="form-grid">



            <input

              name="price"

              type="number"

              placeholder="Price"

              value={formData.price}

              onChange={handleChange}

              required

            />





            <input

              name="stock"

              type="number"

              placeholder="Stock"

              value={formData.stock}

              onChange={handleChange}

              required

            />



          </div>









          <div className="form-grid">



            <input

              name="category"

              placeholder="Category"

              value={formData.category}

              onChange={handleChange}

              required

            />







            <input

              name="brand"

              placeholder="Brand"

              value={formData.brand}

              onChange={handleChange}

              required

            />



          </div>









          <label className="upload-box">



            <FiUploadCloud />



            <span>


              {

                image

                ?

                image.name

                :

                "Upload Product Image"


              }


            </span>





            <input

              type="file"

              accept="image/*"

              onChange={handleImage}

            />



          </label>









          {

            preview && (


              <img

                src={preview}

                className="image-preview"

                alt="preview"

              />


            )

          }









          <button


            disabled={loading}

            className="add-product-btn"


          >



            {

              loading

              ?

              "Uploading..."

              :

              "Add Product"


            }



          </button>






        </form>





      </div>


    </div>


  );


};


export default AddProduct;
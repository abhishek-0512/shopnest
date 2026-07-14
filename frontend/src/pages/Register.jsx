import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import "../styles/auth.css";


const Register = () => {


  const { login } = useContext(AuthContext);


  const navigate = useNavigate();





  const [name,setName] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);








  const handleSubmit = async(e)=>{


    e.preventDefault();


    setLoading(true);



    try{


      const res = await fetch(

        `${import.meta.env.VITE_API_URL}/api/auth/register`,

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json",

          },


          body:JSON.stringify({

            name,

            email,

            password,

          }),

        }

      );






      const data = await res.json();






      if(!res.ok){


        toast.error(

          data.message || "Registration failed."

        );


        return;


      }







      toast.success(

        "Account created successfully 🎉"

      );





      login(data);



      navigate("/");





    }


    catch(error){


      console.error(error);



      toast.error(

        "Unable to connect to the server."

      );


    }



    finally{


      setLoading(false);


    }


  };









  return (


    <div className="auth-container">



      <div className="auth-wrapper">






        {/* BRAND SECTION */}



        <div className="auth-brand">


          <h1>
            ShopNest
          </h1>




          <p>

            Create your account and
            start shopping premium
            products at the best prices.

          </p>





          <div className="auth-features">


            <span>
              🛒 Premium Products
            </span>



            <span>
              🚚 Fast & Secure Delivery
            </span>



            <span>
              🔒 Safe Payments
            </span>



          </div>



        </div>









        {/* REGISTER FORM */}



        <form

          className="auth-form"

          onSubmit={handleSubmit}

        >



          <h2>
            Create Account
          </h2>







          <input

            type="text"

            placeholder="Full Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            required

          />







          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />








          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />









          <button

            type="submit"

            className="btn"

            disabled={loading}

          >

            {

              loading

              ?

              "Creating Account..."

              :

              "Register"

            }


          </button>









          <p>

            Already have an account?

            {" "}


            <Link to="/login">

              Login

            </Link>


          </p>





        </form>





      </div>



    </div>


  );


};


export default Register;
import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  // ===============================
  // LOAD USER FROM LOCAL STORAGE
  // ===============================

  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem("userInfo");


      if (storedUser) {

        const parsedUser =
          JSON.parse(storedUser);


        console.log(
          "LOADED USER FROM STORAGE:",
          parsedUser
        );


        setUser(parsedUser);

      }


    } catch (error) {

      console.error(
        "USER STORAGE ERROR:",
        error
      );


      localStorage.removeItem(
        "userInfo"
      );

    }
    finally {

      setLoading(false);

    }


  }, []);




  // ===============================
  // LOGIN
  // ===============================

  const login = (userData) => {


    console.log(
      "AUTH CONTEXT LOGIN DATA:",
      userData
    );


    if (!userData?.token) {

      console.error(
        "TOKEN MISSING IN LOGIN DATA"
      );

    }


    setUser(userData);


    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );


    console.log(
      "SAVED TO LOCAL STORAGE:",
      JSON.parse(
        localStorage.getItem("userInfo")
      )
    );

  };




  // ===============================
  // LOGOUT
  // ===============================

  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "userInfo"
    );

  };




  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        login,

        logout,

        setUser,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};
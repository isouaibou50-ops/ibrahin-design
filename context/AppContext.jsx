"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // 🛍️ Fetch Shop Products (public endpoint)
  const fetchProductData = async () => {
    try {
      setLoadingProducts(true);
      setProductError("");
      const { data } = await axios.get("/api/shop-products/");
      if (data.success) {
        setProducts(data.products);
      } else {
        setProductError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setProductError(msg);
      toast.error(msg);
    } finally {
      setLoadingProducts(false);
    }
  };

  // 👤 Fetch User Data (only when signed in)
  const fetchUserData = async () => {
    try {
      if (isLoaded && user) {
        const token = await getToken();
        if (!token) return;

        const role = user.publicMetadata?.role || "buyer";
        setIsSeller(role === "seller");

        const { data } = await axios.get("/api/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUserData(data.user);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // 🛒 Cart Functions
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);

    if (user) {
      try {
        const token = await getToken();
        await axios.post("/api/cart/update", { cartData }, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Item added to cart");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;
    setCartItems(cartData);

    if (user) {
      try {
        const token = await getToken();
        await axios.post("/api/cart/update", { cartData }, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Cart updated");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => Object.values(cartItems).reduce((acc, val) => acc + val, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((acc, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      if (item) acc += item.offerPrice * qty;
      return acc;
    }, 0);

  // 🌐 Fetch both product + user data
  useEffect(() => {
    fetchProductData();
    if (isLoaded && user) fetchUserData();
  }, [isLoaded, user]);

  const value = {
    user,
    getToken,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    loadingProducts,
    productError,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};




// 'use client'
// import { useAuth, useUser } from "@clerk/nextjs"
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const useAppContext = () => {
//     return useContext(AppContext)
// }

// export const AppContextProvider = (props) => {

//     const currency = process.env.NEXT_PUBLIC_CURRENCY
//     const router = useRouter();
//     const {user, isLoaded} = useUser();

//     const { getToken } = useAuth();

//     const [products, setProducts] = useState([])
//     const [loadingProducts, setLoadingProducts] = useState(true);
//     const [productError, setProductError] = useState("");
//     const [userData, setUserData] = useState(false)
//     const [isSeller, setIsSeller] = useState(false)
//     const [cartItems, setCartItems] = useState({})

//     const fetchProductData = async () => {
//         try {
//           const {data} = await axios.get('/api/shop-products/');
//           if (data.success){
//             setProducts(data.products);
//           } else {
//             toast.error(data.message)
//           }

//         } catch (error) {
//           toast.error(error.message)
//         }
//     }





//     // const fetchUserData = async () => {
//     //     try {
//     //         if (isLoaded && user) { // ✅ ensure user is available
//     //             const role = user.publicMetadata?.role || "buyer"; // ✅ safe optional chaining
//     //             setIsSeller(role === "seller");

//     //             const token = await getToken();

//     //             const {data} = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}`}})

//     //             if (data.success) {
//     //                 setUserData(data.user)
//     //             } else {
//     //                 toast.error(data.message)
//     //             }
//     //         }
//     //     } catch (error) {
//     //         toast.error(error);
//     //     }
//     // };


//     const fetchUserData = async () => {
//   try {
//     if (isLoaded && user) {
//       const token = await getToken();

//       if (!token) {
//         console.warn("No token yet, skipping fetch");
//         return;
//       }

//       const role = user.publicMetadata?.role || "buyer";
//       setIsSeller(role === "seller");

//       const { data } = await axios.get("/api/user/data", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     }
//   } catch (error) {
//     toast.error(error?.response?.data?.message || error.message);
//   }
// };



//     const addToCart = async (itemId) => {
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = (cartData[itemId] || 0) + 1;
//         setCartItems(cartData);

//         if (user) {
//           try {
//             const token = await getToken();
//             await axios.post("/api/cart/update", {cartData}, {headers: { Authorization: `Bearer ${token}` }});
//             toast.success('Item added to cart')
//           } catch (error) {
//             toast.error(error.message)
//           }
//         }
//     }

//     const updateCartQuantity = async (itemId, quantity) => {

//         let cartData = structuredClone(cartItems);
//         if (quantity === 0) {
//             delete cartData[itemId];
//         } else {
//             cartData[itemId] = quantity;
//         }
//         setCartItems(cartData)
//         if (user) {
//           try {
//             const token = await getToken();
//             await axios.get("/api/cart/update", {cartData}, {headers: { Authorization: `Bearer ${token}` }});
//             toast.success('Item updated to cart')
//           } catch (error) {
//             toast.error(error.message)
//           }
//         }

//     }

//     // const getCartCount = () => {
//     //     let totalCount = 0;
//     //     for (const items in cartItems) {
//     //         if (cartItems[items] > 0) {
//     //             totalCount += cartItems[items];
//     //         }
//     //     }
//     //     return totalCount;
//     // }
//     const getCartCount = () => Object.values(cartItems).reduce((acc, val) => acc + val, 0);

//     // const getCartAmount = () => {
//     //     let totalAmount = 0;
//     //     for (const items in cartItems) {
//     //         let itemInfo = products.find((product) => product._id === items);
//     //         if (cartItems[items] > 0) {
//     //             totalAmount += itemInfo.offerPrice * cartItems[items];
//     //         }
//     //     }
//     //     return Math.floor(totalAmount * 100) / 100;
//     // }
//     const getCartAmount = () => {
//         return Object.entries(cartItems).reduce((acc, [itemId, qty]) => {
//         const itemInfo = products.find((p) => p._id === itemId);
//         if (itemInfo) acc += itemInfo.offerPrice * qty;
//         return acc;
//         }, 0);
//     };

//     // useEffect(() => {
//     //     if (user) {
//     //         fetchProductData()
//     //     }
        
//     // }, [user])
//     useEffect(() => {
//         if (isLoaded && user) {
//         fetchProductData();
//         fetchUserData();
//         } else {
//           fetchProductData()
//         }
//     }, [isLoaded, user]);

   

//     const value = {
//         user,
//         getToken,
//         currency, router,
//         isSeller, setIsSeller,
//         userData, fetchUserData,
//         products, fetchProductData,
//         cartItems, setCartItems,
//         addToCart, updateCartQuantity,
//         getCartCount, getCartAmount
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }
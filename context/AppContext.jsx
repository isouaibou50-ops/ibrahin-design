'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter();
    const {user, isLoaded} = useUser();

    const { getToken } = useAuth();

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const fetchProductData = async () => {
        try {
          const {data} = await axios.get('/api/product/list');
          if (data.success){
            setProducts(data.products);
          } else {
            toast.error(data.message)
          }

        } catch (error) {
          toast.error(error.message)
        }
    }





    // const fetchUserData = async () => {
    //     try {
    //         if (isLoaded && user) { // ✅ ensure user is available
    //             const role = user.publicMetadata?.role || "buyer"; // ✅ safe optional chaining
    //             setIsSeller(role === "seller");

    //             const token = await getToken();

    //             const {data} = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}`}})

    //             if (data.success) {
    //                 setUserData(data.user)
    //             } else {
    //                 toast.error(data.message)
    //             }
    //         }
    //     } catch (error) {
    //         toast.error(error);
    //     }
    // };


    const fetchUserData = async () => {
  try {
    if (isLoaded && user) {
      const token = await getToken();

      if (!token) {
        console.warn("No token yet, skipping fetch");
        return;
      }

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



    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);

        if (user) {
          try {
            const token = await getToken();
            await axios.post("/api/cart/update", {cartData}, {headers: { Authorization: `Bearer ${token}` }});
            toast.success('Item added to cart')
          } catch (error) {
            toast.error(error.message)
          }
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        if (user) {
          try {
            const token = await getToken();
            await axios.get("/api/cart/update", {cartData}, {headers: { Authorization: `Bearer ${token}` }});
            toast.success('Item updated to cart')
          } catch (error) {
            toast.error(error.message)
          }
        }

    }

    // const getCartCount = () => {
    //     let totalCount = 0;
    //     for (const items in cartItems) {
    //         if (cartItems[items] > 0) {
    //             totalCount += cartItems[items];
    //         }
    //     }
    //     return totalCount;
    // }
    const getCartCount = () => Object.values(cartItems).reduce((acc, val) => acc + val, 0);

    // const getCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const items in cartItems) {
    //         let itemInfo = products.find((product) => product._id === items);
    //         if (cartItems[items] > 0) {
    //             totalAmount += itemInfo.offerPrice * cartItems[items];
    //         }
    //     }
    //     return Math.floor(totalAmount * 100) / 100;
    // }
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((acc, [itemId, qty]) => {
        const itemInfo = products.find((p) => p._id === itemId);
        if (itemInfo) acc += itemInfo.offerPrice * qty;
        return acc;
        }, 0);
    };

    // useEffect(() => {
    //     if (user) {
    //         fetchProductData()
    //     }
        
    // }, [user])
    useEffect(() => {
        if (isLoaded && user) {
        fetchProductData();
        fetchUserData();
        }
    }, [isLoaded, user]);

   

    const value = {
        user,
        getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
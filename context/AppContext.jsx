"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "R"; // Default to Rand for CT
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [productError, setProductError] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // 🛍️ Fetch Shop Products
  const fetchProductData = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setProductError("");
      const { data } = await axios.get("/api/shop-products/");
      if (data.success) {
        setProducts(data.products);
      } else {
        setProductError(data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load products";
      setProductError(msg);
      console.error("Product Fetch Error:", error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // 👤 Fetch User Data & Sync Cart
  const fetchUserData = useCallback(async () => {
    if (!isLoaded || !user) {
      setLoadingUser(false);
      return;
    }

    try {
      setLoadingUser(true);
      const token = await getToken();
      if (!token) return;

      const role = user.publicMetadata?.role || "buyer";
      setIsSeller(role === "seller");

      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        // If user has a cart in DB, merge or set it
        if (data.user.cartItems && Object.keys(data.user.cartItems).length > 0) {
          setCartItems(data.user.cartItems);
        }
      }
    } catch (error) {
      console.error("User Data Error:", error);
    } finally {
      setLoadingUser(false);
    }
  }, [isLoaded, user, getToken]);

  // 🛒 Cart Functions with LocalStorage Persistence
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    
    // Update local state immediately (Optimistic)
    setCartItems(cartData);
    localStorage.setItem("ibrahim_cart", JSON.stringify(cartData));

    if (user) {
      try {
        const token = await getToken();
        await axios.post("/api/cart/update", { cartData }, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Added to cart", { icon: '🛍️' });
      } catch (error) {
        toast.error("Sign in to sync your cart");
      }
    } else {
      toast.success("Added to guest cart");
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    
    setCartItems(cartData);
    localStorage.setItem("ibrahim_cart", JSON.stringify(cartData));

    if (user) {
      try {
        const token = await getToken();
        await axios.post("/api/cart/update", { cartData }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        toast.error("Failed to update cloud cart");
      }
    }
  };

  const getCartCount = () => Object.values(cartItems).reduce((acc, val) => acc + val, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((acc, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      if (item) acc += (item.offerPrice || item.price) * qty;
      return acc;
    }, 0);

  // 🌐 Initial Load
  useEffect(() => {
    fetchProductData();
    
    // Load guest cart from local storage on mount
    const localCart = localStorage.getItem("ibrahim_cart");
    if (localCart) {
      try {
        setCartItems(JSON.parse(localCart));
      } catch (e) {
        localStorage.removeItem("ibrahim_cart");
      }
    }
  }, [fetchProductData]);

  useEffect(() => {
    if (isLoaded) {
      fetchUserData();
    }
  }, [isLoaded, user, fetchUserData]);

  const value = {
    user,
    isLoaded,
    loadingUser,
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

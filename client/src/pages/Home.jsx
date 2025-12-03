import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import ProductCard from "../components/ProductCard.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleCart = (product) => {
    alert(`${product.name} added to carts`);
  };

  return (
    <div className="relative">
      <Navbar className="fixed top-0 left-0 w-full" />

      <div
        className="pt-28 grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        gap-6 p-6 bg-gray-50"
      >
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onCart={handleCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;

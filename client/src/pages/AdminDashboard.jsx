import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import ProductCard from "../components/ProductCard.jsx";
import { useAuth } from "../context/AuthContext";
import AdminNavbar from "../components/adminNavbar.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid"; // Optional icon

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) fetchProducts();
  }, [user, isAdmin]);

  // Delete & Edit
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (product) => {
  navigate(`/admin/edit-product/${product._id}`);
};


  // Auth loading
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="relative">
      <AdminNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        {loadingProducts ? (
          <p className="text-center text-gray-600 mt-10">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No products found.</p>
        ) : (
          <div className="pt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Product Button */}
      <button
        onClick={() => navigate("/admin/create-product")}
        className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        title="Add New Product"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AdminDashboard;

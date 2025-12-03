import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api.js";

const ProductForm = () => {
  const { id } = useParams(); // if exists = EDIT mode
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  // Load existing product in EDIT mode
  useEffect(() => {
    if (isEdit) {
      API.get(`/api/products/${id}`)
        .then((res) => {
          const p = res.data;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setImage(p.image);
          setCategory(p.category);
        })
        .catch((err) => console.error("Failed to load product:", err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, description, price, image, category };

    try {
      if (isEdit) {
        await API.put(`/api/products/${id}`, payload);
        alert("Product updated successfully!");
      } else {
        await API.post("/api/products", payload);
        alert("Product created successfully!");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl text-green-400 font-bold mb-4">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

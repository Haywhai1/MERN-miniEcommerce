import React from "react";

const ProductCard = ({ product, onEdit, onDelete, onCart }) => {
  return (
    <div
      className="bg-white border rounded-xl shadow-sm hover:shadow-lg 
                 transition-all duration-200 flex flex-col 
                 w-full max-w-xs mx-auto"
    >

      {/* Image */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        <h3 className="text-lg font-semibold text-gray-800 leading-tight truncate">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <p className="font-bold text-gray-900 text-lg mt-3">
          ${product.price}
        </p>

        {/* Admin Buttons */}
        {onEdit && (
          <div className="flex gap-2 mt-auto pt-3">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-green-500 text-white text-sm py-1.5 rounded-md 
                         hover:bg-green-600 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(product._id)}
              className="flex-1 bg-green-500 text-white text-sm py-1.5 rounded-md 
                         hover:bg-green-600 transition"
            >
              Delete 
            </button>
          </div>
        )}

        {/* user buttons */}
         {onCart && (
          <button
              onClick={() => onCart(product)}
              className="flex-1 bg-orange-500 text-white text-sm py-1.5 rounded-md 
                         hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
         )}
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

export const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔗 URL de tu backend en Render
  const API_URL = "https://backend-sisj.onrender.com/api/productos";

  // 🚀 Obtener los productos desde tu backend (que a su vez trae datos desde Shopify)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import type { Product } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { t, formatPrice } = useTranslation();
  return (
    <div 
      className="group cursor-pointer flex flex-col h-full" 
      onClick={() => onClick(product)}
    >
      <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-4 relative">
        <img
          src={product.images[0]}
          alt={t(product.nameKey)}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300 absolute inset-0"
        />
      </div>
      <div className="flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-gray-900 h-10 line-clamp-2 overflow-hidden mb-1 leading-5">{t(product.nameKey)}</h3>
          <p className="text-sm text-gray-500 mt-1 flex-grow line-clamp-2 overflow-hidden">{t(product.descriptionKey)}</p>
          <p className="text-md font-semibold text-gray-900 mt-2">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

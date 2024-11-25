import React from 'react';
import { Card } from '../types';
import { Plus, TrendingUp } from 'lucide-react';

interface CardGridProps {
  cards: Card[];
  onAddToCollection: (card: Card) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onAddToCollection }) => {
  const getValueClass = (price: number) => {
    if (price >= 100) return 'bg-red-50 border-red-200 text-red-700';
    if (price >= 50) return 'bg-orange-50 border-orange-200 text-orange-700';
    if (price >= 20) return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-green-50 border-green-200 text-green-700';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
        >
          {card.cardmarket?.prices.trendPrice >= 20 && (
            <div className="absolute top-2 right-2 z-10">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getValueClass(card.cardmarket.prices.trendPrice)}`}>
                <TrendingUp size={14} />
                <span className="text-sm font-medium">${card.cardmarket.prices.trendPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
          <img
            src={card.images.large}
            alt={card.name}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white text-lg font-bold mb-2">{card.name}</h3>
              {card.cardmarket?.prices && (
                <div className="space-y-1 text-center mb-4">
                  <p className="text-white font-medium">
                    Market: ${card.cardmarket.prices.trendPrice.toFixed(2)}
                  </p>
                  <p className="text-white text-sm">
                    Low: ${card.cardmarket.prices.lowPrice.toFixed(2)}
                  </p>
                  <p className="text-white text-sm">
                    Avg: ${card.cardmarket.prices.averageSellPrice.toFixed(2)}
                  </p>
                </div>
              )}
              <button
                onClick={() => onAddToCollection(card)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={20} />
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
import React from 'react';
import { useQuery } from 'react-query';
import { getSetCards } from '../services/pokemonApi';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../types';

interface SetDetailProps {
  setId: string;
  onBack: () => void;
  onAddToCollection: (card: Card) => void;
}

export const SetDetail: React.FC<SetDetailProps> = ({
  setId,
  onBack,
  onAddToCollection,
}) => {
  const { data: cards, isLoading } = useQuery(['setCards', setId], () =>
    getSetCards(setId)
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading set cards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back to Sets
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards?.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105"
          >
            <img
              src={card.images.large}
              alt={card.name}
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">
                {card.name} - #{card.number}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Rarity: {card.rarity}</p>
                {card.cardmarket?.prices && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Market Prices:
                    </p>
                    <p className="text-sm text-gray-600">
                      Trend: ${card.cardmarket.prices.trendPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Low: ${card.cardmarket.prices.lowPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Avg: ${card.cardmarket.prices.averageSellPrice.toFixed(2)}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => onAddToCollection(card)}
                  className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
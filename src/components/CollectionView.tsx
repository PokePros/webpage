import React from 'react';
import { CollectionCard } from '../types';
import { Trash2, Pencil } from 'lucide-react';

interface CollectionViewProps {
  cards: CollectionCard[];
  onRemove: (cardId: string) => void;
  onEdit: (card: CollectionCard) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  cards,
  onRemove,
  onEdit,
}) => {
  const totalValue = cards.reduce((sum, card) => {
    const price = card.cardmarket?.prices.trendPrice || 0;
    return sum + price * card.quantity;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Collection Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Cards</p>
            <p className="text-2xl font-bold text-blue-600">
              {cards.reduce((sum, card) => sum + card.quantity, 0)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Estimated Value</p>
            <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={card.images.large}
              alt={card.name}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{card.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {card.quantity}</p>
              <p className="text-sm text-gray-600">
                Condition: {card.condition || 'Not specified'}
              </p>
              {card.cardmarket?.prices && (
                <p className="text-sm text-gray-600">
                  Current Value: ${card.cardmarket.prices.trendPrice.toFixed(2)}
                </p>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(card)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onRemove(card.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
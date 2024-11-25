import React from 'react';
import { useQuery } from 'react-query';
import { getAllSets } from '../services/pokemonApi';
import { Calendar, Package } from 'lucide-react';

interface SetsListProps {
  onSetSelect: (setId: string) => void;
}

export const SetsList: React.FC<SetsListProps> = ({ onSetSelect }) => {
  const { data: sets, isLoading } = useQuery('sets', getAllSets, {
    staleTime: 3600000, // 1 hour
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading sets...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sets?.map((set) => (
        <button
          key={set.id}
          onClick={() => onSetSelect(set.id)}
          className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="relative aspect-video">
            <img
              src={set.images.logo}
              alt={set.name}
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          </div>
          <div className="p-4 border-t">
            <h3 className="font-bold text-lg mb-2">{set.name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Released: {new Date(set.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={16} />
                <span>Total Cards: {set.total}</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
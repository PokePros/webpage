import React from 'react';
import { useQuery } from 'react-query';
import { getAllSets } from '../services/pokemonApi';
import { Calendar, Package } from 'lucide-react';

interface FeaturedSetsProps {
  onSetSelect: (setId: string) => void;
}

export const FeaturedSets: React.FC<FeaturedSetsProps> = ({ onSetSelect }) => {
  const { data: sets, isLoading } = useQuery('sets', getAllSets, {
    staleTime: 3600000,
  });

  if (isLoading || !sets) return null;

  const recentSets = sets.slice(0, 4);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Recent Sets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recentSets.map((set) => (
          <button
            key={set.id}
            onClick={() => onSetSelect(set.id)}
            className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <div className="relative aspect-video">
              <img
                src={set.images.logo}
                alt={set.name}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-4 border-t">
              <h3 className="font-semibold text-gray-800 mb-2 truncate">
                {set.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(set.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package size={14} />
                  <span>{set.total} cards</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
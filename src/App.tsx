import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CardGrid } from './components/CardGrid';
import { CollectionView } from './components/CollectionView';
import { EditCardModal } from './components/EditCardModal';
import { SetsList } from './components/SetsList';
import { SetDetail } from './components/SetDetail';
import { FeaturedSets } from './components/FeaturedSets';
import { useCollectionStore } from './store/collectionStore';
import { Card, CollectionCard } from './types';
import { LayoutGrid, Search as SearchIcon, Library, BookOpen } from 'lucide-react';
import { useQuery } from 'react-query';
import { searchPokemonCards } from './services/pokemonApi';

function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'collection' | 'sets'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<CollectionCard | null>(null);
  const { collection, addCard, removeCard, updateCard } = useCollectionStore();

  const { data: searchResults, isLoading } = useQuery(
    ['pokemonCards', searchQuery],
    () => searchPokemonCards(searchQuery),
    {
      enabled: !!searchQuery,
      retry: 1,
      staleTime: 300000,
      cacheTime: 3600000,
    }
  );

  const handleAddToCollection = (card: Card) => {
    const existingCard = collection.cards.find((c) => c.id === card.id);
    if (existingCard) {
      updateCard(card.id, { quantity: existingCard.quantity + 1 });
    } else {
      addCard({ ...card, quantity: 1 });
    }
  };

  const handleSetSelect = (setId: string) => {
    setSelectedSetId(setId);
    setActiveTab('sets');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Poke Pros</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => {
                  setActiveTab('search');
                  setSelectedSetId(null);
                }}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'search'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </button>
              <button
                onClick={() => {
                  setActiveTab('sets');
                  setSelectedSetId(null);
                }}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'sets'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Sets
              </button>
              <button
                onClick={() => {
                  setActiveTab('collection');
                  setSelectedSetId(null);
                }}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'collection'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Library className="h-5 w-5 mr-2" />
                Collection
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'search' && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            {!searchQuery && <FeaturedSets onSetSelect={handleSetSelect} />}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching for cards...</p>
              </div>
            ) : (
              searchResults && (
                <CardGrid
                  cards={searchResults}
                  onAddToCollection={handleAddToCollection}
                />
              )
            )}
          </div>
        )}

        {activeTab === 'sets' && (
          selectedSetId ? (
            <SetDetail
              setId={selectedSetId}
              onBack={() => setSelectedSetId(null)}
              onAddToCollection={handleAddToCollection}
            />
          ) : (
            <SetsList onSetSelect={setSelectedSetId} />
          )
        )}

        {activeTab === 'collection' && (
          <CollectionView
            cards={collection.cards}
            onRemove={removeCard}
            onEdit={setEditingCard}
          />
        )}
      </main>

      {editingCard && (
        <EditCardModal
          card={editingCard}
          onSave={updateCard}
          onClose={() => setEditingCard(null)}
        />
      )}
    </div>
  );
}

export default App;
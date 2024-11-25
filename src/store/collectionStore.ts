import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Collection, CollectionCard } from '../types';

interface CollectionStore {
  collection: Collection;
  addCard: (card: CollectionCard) => void;
  removeCard: (cardId: string) => void;
  updateCard: (cardId: string, updates: Partial<CollectionCard>) => void;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collection: { cards: [] },
      addCard: (card) =>
        set((state) => ({
          collection: {
            cards: [...state.collection.cards, card],
          },
        })),
      removeCard: (cardId) =>
        set((state) => ({
          collection: {
            cards: state.collection.cards.filter((card) => card.id !== cardId),
          },
        })),
      updateCard: (cardId, updates) =>
        set((state) => ({
          collection: {
            cards: state.collection.cards.map((card) =>
              card.id === cardId ? { ...card, ...updates } : card
            ),
          },
        })),
    }),
    {
      name: 'pokemon-collection',
    }
  )
);
import { Card } from '../types';

const API_KEY = import.meta.env.VITE_POKEMON_API_KEY;
const BASE_URL = 'https://api.pokemontcg.io/v2';

const sortCardsByValue = (cards: Card[]) => {
  return [...cards].sort((a, b) => {
    const valueA = a.cardmarket?.prices.trendPrice || 0;
    const valueB = b.cardmarket?.prices.trendPrice || 0;
    return valueB - valueA;
  });
};

export const searchPokemonCards = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cards?q=name:${encodeURIComponent(query)}*&orderBy=-set.releaseDate&pageSize=20`,
      {
        headers: {
          'X-Api-Key': API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch cards');
    const data = await response.json();
    return sortCardsByValue(data.data as Card[]);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};

export const getAllSets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sets?orderBy=-releaseDate`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch sets');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return [];
  }
};

export const getSetCards = async (setId: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cards?q=set.id:${setId}&orderBy=number`,
      {
        headers: {
          'X-Api-Key': API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch set cards');
    const data = await response.json();
    return sortCardsByValue(data.data as Card[]);
  } catch (error) {
    console.error('Error fetching set cards:', error);
    return [];
  }
};
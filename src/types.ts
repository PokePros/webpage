export interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  cardmarket?: {
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
    };
  };
  rarity?: string;
  set: {
    name: string;
  };
}

export interface Collection {
  cards: CollectionCard[];
}

export interface CollectionCard extends Card {
  quantity: number;
  purchasePrice?: number;
  purchaseDate?: string;
  condition?: 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Light Played' | 'Played' | 'Poor';
}
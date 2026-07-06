export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  priceType: 'hourly' | 'fixed';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    completedJobs: number;
  };
}

export interface FilterOptions {
  searchQuery: string;
  categories: string[];
  maxPrice: number;
  minRating: number;
}

export type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface SortOption {
  key: SortKey;
  label: string;
}

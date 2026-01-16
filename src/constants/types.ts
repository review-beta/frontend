// Location
export interface City {
  id: number;
  name: string;
  state: number;
}

export interface State {
  id: number;
  name: string;
}

// Reviews
export interface RandomReview {
  comment: string;
  rating?: number;
  author?: string | null;
}

// Shared base (optional but powerful)
export interface BaseRatedItem {
  id: number;
  description: string;
  is_featured: boolean;
  review_count?: number;
  average_rating: number;
  random_review?: RandomReview | null;
  state?: State | null;
  city?: City | null;
}

// Movies
export interface Movie extends BaseRatedItem {
  title: string;
  poster_thumbnail: string;
  poster_full: string;
  release_date: string;
  trailer_url: string;
  genre: { name: string }[];
  movie_type?: string; 
  age_rating?: string; 
}

// Dining
export interface Dining extends BaseRatedItem {
  name: string;
  banner_image: string;
  cuisine_type: string;
  location: string;
}

// Events
export interface Event extends BaseRatedItem {
  title: string;
  banner_image: string;
  category: string;
  location: string;
}

// Businesses
export interface Business extends BaseRatedItem {
  name: string;
  banner_image: string;
  business_type: string;
  location: string;
}

// Hangouts
export interface Hangout extends BaseRatedItem {
  name: string;
  banner_image: string;
  type: string;
  location: string;
}

export interface Tab {
  id: number | string;
  name: string;
  slug?: string;
}
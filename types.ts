
export interface MealData {
  day: string;
  prepared: number;
  served: number;
  wasteKg: number;
}

export interface LeftoverEntry {
  id: string;
  meal: string;
  cooked: number;
  served: number;
  cost: number;
  timestamp: string;
}

export interface Preference {
  dish: string;
  votes: number;
}

export interface Feedback {
  id: string;
  meal: string;
  rating: number;
  note: string;
  date: string;
  author: string;
}

export interface Forecast {
  day: string;
  focus: string;
  action: string;
}

export interface Suggestion {
  type: 'Portion' | 'Menu' | 'Engagement';
  text: string;
}

export interface MenuItem {
  id: string; // Added ID for reliable editing
  name: string;
  category: 'Veg' | 'Non-Veg' | 'Special';
}

export interface DailyMenu {
  day: string;
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

export interface ItemRating {
  itemId: string;
  itemName: string;
  username: string;
  rating: number;
}

export type Role = 'admin' | 'student';

export interface User {
  username: string;
  role: Role;
}

export interface AppState {
  costPerPlate: number;
  mealsData: MealData[];
  leftoverDetails: LeftoverEntry[];
  preferenceData: Preference[];
  feedbackQueue: Feedback[];
  forecastData: Forecast[];
  suggestions: Suggestion[];
  weeklyMenu: DailyMenu[];
  itemRatings: ItemRating[]; // Added ratings
  lastUpdated: string;
}

export type Section = 'dashboard' | 'meal-plans' | 'feedback' | 'reports' | 'settings' | 'menu' | 'daily-analytics' | 'todays-menu';

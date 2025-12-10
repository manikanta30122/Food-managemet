
import { AppState } from './types';

export const SEED_DATA: AppState = {
  lastUpdated: new Date().toISOString(),
  costPerPlate: 25,
  mealsData: [
    { day: 'Mon', prepared: 480, served: 430, wasteKg: 18 },
    { day: 'Tue', prepared: 500, served: 460, wasteKg: 15 },
    { day: 'Wed', prepared: 510, served: 470, wasteKg: 14 },
    { day: 'Thu', prepared: 495, served: 455, wasteKg: 16 },
    { day: 'Fri', prepared: 520, served: 488, wasteKg: 12 },
    { day: 'Sat', prepared: 460, served: 430, wasteKg: 11 },
    { day: 'Sun', prepared: 420, served: 398, wasteKg: 9 },
  ],
  leftoverDetails: [
    { id: '1', meal: 'Breakfast', cooked: 180, served: 165, cost: 25, timestamp: new Date().toISOString() },
    { id: '2', meal: 'Lunch', cooked: 220, served: 190, cost: 35, timestamp: new Date().toISOString() },
    { id: '3', meal: 'Snacks', cooked: 140, served: 125, cost: 15, timestamp: new Date().toISOString() },
    { id: '4', meal: 'Dinner', cooked: 240, served: 215, cost: 30, timestamp: new Date().toISOString() },
  ],
  preferenceData: [
    { dish: 'Paneer Lababdar', votes: 92 },
    { dish: 'Veg Pulao', votes: 86 },
    { dish: 'Dal Tadka', votes: 78 },
    { dish: 'Mixed Sprouts', votes: 64 },
    { dish: 'Fruit Salad', votes: 58 },
  ],
  feedbackQueue: [
    { id: '1', meal: 'Lunch', rating: 4, note: 'Loved the fresh salad bar.', date: new Date().toISOString(), author: 'Sai' },
    { id: '2', meal: 'Dinner', rating: 5, note: 'Perfectly spiced dal, keep it!', date: new Date().toISOString(), author: 'Rohan' },
    { id: '3', meal: 'Breakfast', rating: 3, note: 'Tea was a bit cold today.', date: new Date().toISOString(), author: 'Priya' },
  ],
  forecastData: [
    { day: 'Thu', focus: 'High demand lunch', action: '-8% prep dinner' },
    { day: 'Fri', focus: 'Exam week: comfort food', action: '+10% dal & rice' },
    { day: 'Sat', focus: 'Outing for 2nd-years', action: '-60 plates overall' },
    { day: 'Sun', focus: 'Sports finals brunch', action: '+90 pancakes' },
    { day: 'Mon', focus: 'Normal turnout', action: 'Monitor cereals' },
    { day: 'Tue', focus: 'Vegan club request', action: '+30 plant bowls' },
    { day: 'Wed', focus: 'Guest chef night', action: 'Pre-book slots' },
  ],
  suggestions: [
    {
      type: 'Portion',
      text: 'Based on last Monday, prepare only 440 plates of Rice (-8%).',
    },
    {
      type: 'Menu',
      text: 'Swap Friday dinner dessert with fresh fruit bowls (High Request).',
    },
    {
      type: 'Engagement',
      text: 'Student satisfaction drops on Tuesdays. Add a special item.',
    },
  ],
  weeklyMenu: [
    {
      day: 'Monday',
      breakfast: [{ id: 'm1_b1', name: 'Aloo Paratha', category: 'Veg' }, { id: 'm1_b2', name: 'Curd', category: 'Veg' }],
      lunch: [{ id: 'm1_l1', name: 'Rajma Chawal', category: 'Veg' }, { id: 'm1_l2', name: 'Jeera Rice', category: 'Veg' }],
      dinner: [{ id: 'm1_d1', name: 'Egg Curry', category: 'Non-Veg' }, { id: 'm1_d2', name: 'Mix Veg', category: 'Veg' }]
    },
    {
      day: 'Tuesday',
      breakfast: [{ id: 'm2_b1', name: 'Idli Sambar', category: 'Veg' }, { id: 'm2_b2', name: 'Chutney', category: 'Veg' }],
      lunch: [{ id: 'm2_l1', name: 'Lemon Rice', category: 'Veg' }, { id: 'm2_l2', name: 'Curd Rice', category: 'Veg' }],
      dinner: [{ id: 'm2_d1', name: 'Paneer Butter Masala', category: 'Veg' }, { id: 'm2_d2', name: 'Naan', category: 'Veg' }]
    },
    {
      day: 'Wednesday',
      breakfast: [{ id: 'm3_b1', name: 'Poha', category: 'Veg' }, { id: 'm3_b2', name: 'Jalebi', category: 'Special' }],
      lunch: [{ id: 'm3_l1', name: 'Veg Biryani', category: 'Veg' }, { id: 'm3_l2', name: 'Raita', category: 'Veg' }],
      dinner: [{ id: 'm3_d1', name: 'Chicken Curry', category: 'Non-Veg' }, { id: 'm3_d2', name: 'Rice', category: 'Veg' }]
    },
    {
      day: 'Thursday',
      breakfast: [{ id: 'm4_b1', name: 'Sandwich', category: 'Veg' }, { id: 'm4_b2', name: 'Coffee', category: 'Veg' }],
      lunch: [{ id: 'm4_l1', name: 'Dal Makhani', category: 'Veg' }, { id: 'm4_l2', name: 'Roti', category: 'Veg' }],
      dinner: [{ id: 'm4_d1', name: 'Aloo Gobi', category: 'Veg' }, { id: 'm4_d2', name: 'Kheer', category: 'Special' }]
    },
    {
      day: 'Friday',
      breakfast: [{ id: 'm5_b1', name: 'Dosa', category: 'Veg' }, { id: 'm5_b2', name: 'Sambar', category: 'Veg' }],
      lunch: [{ id: 'm5_l1', name: 'Fried Rice', category: 'Veg' }, { id: 'm5_l2', name: 'Manchurian', category: 'Veg' }],
      dinner: [{ id: 'm5_d1', name: 'Fish Curry', category: 'Non-Veg' }, { id: 'm5_d2', name: 'Rice', category: 'Veg' }]
    },
    {
      day: 'Saturday',
      breakfast: [{ id: 'm6_b1', name: 'Puri Bhaji', category: 'Veg' }, { id: 'm6_b2', name: 'Tea', category: 'Veg' }],
      lunch: [{ id: 'm6_l1', name: 'Khichdi', category: 'Veg' }, { id: 'm6_l2', name: 'Papad', category: 'Veg' }],
      dinner: [{ id: 'm6_d1', name: 'Chole Bhature', category: 'Veg' }, { id: 'm6_d2', name: 'Ice Cream', category: 'Special' }]
    },
    {
      day: 'Sunday',
      breakfast: [{ id: 'm7_b1', name: 'Masala Dosa', category: 'Veg' }, { id: 'm7_b2', name: 'Vada', category: 'Veg' }],
      lunch: [{ id: 'm7_l1', name: 'Chicken Biryani', category: 'Non-Veg' }, { id: 'm7_l2', name: 'Veg Pulao', category: 'Veg' }],
      dinner: [{ id: 'm7_d1', name: 'Burger', category: 'Special' }, { id: 'm7_d2', name: 'Fries', category: 'Veg' }]
    },
  ],
  itemRatings: [
    { itemId: 'm1_b1', itemName: 'Aloo Paratha', username: 'Sai', rating: 4 },
    { itemId: 'm1_b1', itemName: 'Aloo Paratha', username: 'Rohan', rating: 5 },
  ]
};

export const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) => new Intl.NumberFormat('en-IN').format(value);

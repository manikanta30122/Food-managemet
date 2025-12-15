

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  MessageSquare, 
  FileBarChart, 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  ChefHat, 
  Download,
  Plus,
  RefreshCw,
  LogOut,
  Calendar,
  User as UserIcon,
  Lock,
  Moon,
  Sun,
  Image as ImageIcon,
  Star,
  Edit2,
  Trash2,
  Save,
  Check,
  BrainCircuit,
  Calculator,
  Coffee,
  Sunrise,
  Sunset
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AppState, Section, LeftoverEntry, Feedback, User, Role, MenuItem, DailyMenu, ItemRating } from './types';
import { SEED_DATA, formatCurrency, formatNumber } from './constants';

const LOCAL_STORAGE_KEY = 'hostel_hive_v2';
const USER_STORAGE_KEY = 'hostel_hive_user';
const THEME_STORAGE_KEY = 'hostel_hive_theme';

const BACKGROUNDS = ['bg1.jpeg', 'bg2.jpeg', 'bg3.jpeg', 'bg4.jpeg', 'bg5.jpeg'];

// --- Helper Components ---

const Logo = () => (
  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-white/20">
    <img src="logo.jpeg" alt="Hostel Hive Logo" className="w-full h-full object-cover" />
  </div>
);

// --- Star Rating Component ---
const StarRating = ({ 
  rating, 
  onRate, 
  readOnly = false,
  avgRating,
  count
}: { 
  rating: number; 
  onRate?: (r: number) => void; 
  readOnly?: boolean;
  avgRating?: number;
  count?: number;
}) => {
  const [hover, setHover] = useState(0);

  if (readOnly && avgRating !== undefined) {
    return (
      <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-medium">
        <Star size={10} className="text-amber-400 fill-amber-400" />
        <span className="dark:text-white text-slate-800">{avgRating.toFixed(1)}</span>
        <span className="text-slate-500 dark:text-slate-400">({count})</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onRate?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`p-0.5 transition-all ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          disabled={readOnly}
        >
          <Star
            size={14}
            className={`
              ${star <= (hover || rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}
              transition-colors
            `}
          />
        </button>
      ))}
    </div>
  );
};

// --- Auth Component ---
const AuthScreen = ({ onLogin, theme, toggleTheme }: { onLogin: (user: User) => void, theme: string, toggleTheme: () => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    setBgIndex(Math.floor(Math.random() * BACKGROUNDS.length));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Hardcoded logic for roles as per request
    const lowerName = username.toLowerCase();
    const role: Role = lowerName === 'aditya' ? 'admin' : 'student';
    
    // Simulate delay
    setTimeout(() => {
      onLogin({ username, role });
    }, 600);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-all duration-700 bg-cover bg-center"
      style={{ backgroundImage: `url(${BACKGROUNDS[bgIndex]})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={toggleTheme} 
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="w-full max-w-md z-10">
        <div className={`
          p-8 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-slate-900/70 border border-white/10 text-white' 
            : 'bg-white/80 border border-white/40 text-slate-800'
          } backdrop-blur-xl
        `}>
           
           <div className="text-center mb-8">
             <div className="flex justify-center mb-4">
               <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30">
                 <img src="logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
               </div>
             </div>
             <h1 className="text-3xl font-bold mb-2 tracking-tight">Hostel Hive</h1>
             <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
               {isSignUp ? "Create your student account" : "Welcome back, please login"}
             </p>
           </div>

           {error && (
             <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
               <AlertCircle size={16} />
               {error}
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ml-1 uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Username</label>
                <div className="relative group">
                  <UserIcon size={18} className={`absolute left-3.5 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Aditya or Sai"
                    className={`
                      w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all
                      ${theme === 'dark' 
                        ? 'bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:border-blue-500' 
                        : 'bg-white/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500'
                      }
                    `}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-xs font-bold mb-1.5 ml-1 uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Password</label>
                <div className="relative group">
                  <Lock size={18} className={`absolute left-3.5 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`
                      w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all
                      ${theme === 'dark' 
                        ? 'bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:border-blue-500' 
                        : 'bg-white/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500'
                      }
                    `}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
           </form>

           <div className="mt-8 text-center">
             <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-xs font-medium transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
             >
               {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
             </button>
           </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-white/60 text-xs font-medium drop-shadow-md">
            Demo: <span className="text-white">Aditya</span> (Admin) | <span className="text-white">Sai</span> (Student)
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // --- State Management ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  });

  const [bgImage, setBgImage] = useState(BACKGROUNDS[0]);

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [data, setData] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new fields exist if migrating from old state
        if (!parsed.weeklyMenu) parsed.weeklyMenu = SEED_DATA.weeklyMenu;
        if (!parsed.itemRatings) parsed.itemRatings = SEED_DATA.itemRatings;
        return parsed;
      } catch (e) {
        console.error("Failed to parse local storage", e);
        return SEED_DATA;
      }
    }
    return SEED_DATA;
  });

  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Admin Editing State
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  
  // Production Calculator State
  const [calcDay, setCalcDay] = useState('Monday');
  const [calcMeal, setCalcMeal] = useState('Lunch');

  // Daily Analytics State
  const [analyticsDate, setAnalyticsDate] = useState(new Date().toISOString().split('T')[0]);

  // --- Effects ---
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      if (user.role === 'student' && activeSection === 'dashboard') {
        setActiveSection('todays-menu');
      }
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    const rand = Math.floor(Math.random() * BACKGROUNDS.length);
    setBgImage(BACKGROUNDS[rand]);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setActiveSection(newUser.role === 'admin' ? 'dashboard' : 'todays-menu');
    showToast(`Welcome, ${newUser.username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Item Rating Logic ---
  const handleRateItem = (itemId: string, itemName: string, rating: number) => {
    if (!user) return;
    setData(prev => {
      // Remove existing rating for this user and item if exists
      const filtered = prev.itemRatings.filter(r => !(r.itemId === itemId && r.username === user.username));
      const newRating: ItemRating = { itemId, itemName, username: user.username, rating };
      return { ...prev, itemRatings: [...filtered, newRating] };
    });
    // Optional: show toast only on first rate to avoid spam
  };

  const getItemRating = (itemId: string) => {
    if (!user) return 0;
    const rating = data.itemRatings.find(r => r.itemId === itemId && r.username === user.username);
    return rating ? rating.rating : 0;
  };

  const getItemStats = (itemId: string) => {
    const ratings = data.itemRatings.filter(r => r.itemId === itemId);
    if (ratings.length === 0) return { avg: 0, count: 0 };
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return { avg: sum / ratings.length, count: ratings.length };
  };

  // --- Menu Editing Logic ---
  const handleUpdateMenuItem = (dayIdx: number, mealKey: 'breakfast'|'lunch'|'dinner', itemIdx: number, field: keyof MenuItem, value: string) => {
    setData(prev => {
      const newMenu = [...prev.weeklyMenu];
      newMenu[dayIdx][mealKey][itemIdx] = { ...newMenu[dayIdx][mealKey][itemIdx], [field]: value };
      return { ...prev, weeklyMenu: newMenu };
    });
  };

  const handleDeleteMenuItem = (dayIdx: number, mealKey: 'breakfast'|'lunch'|'dinner', itemIdx: number) => {
    if(!window.confirm("Remove this item?")) return;
    setData(prev => {
      const newMenu = [...prev.weeklyMenu];
      newMenu[dayIdx][mealKey] = newMenu[dayIdx][mealKey].filter((_, i) => i !== itemIdx);
      return { ...prev, weeklyMenu: newMenu };
    });
  };

  const handleAddMenuItem = (dayIdx: number, mealKey: 'breakfast'|'lunch'|'dinner') => {
    setData(prev => {
      const newMenu = [...prev.weeklyMenu];
      const newItem: MenuItem = { id: Date.now().toString(), name: 'New Item', category: 'Veg' };
      newMenu[dayIdx][mealKey].push(newItem);
      return { ...prev, weeklyMenu: newMenu };
    });
  };

  // --- Standard Actions ---
  const handleLogMeal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const cooked = Number(formData.get('cooked'));
    const served = Number(formData.get('served'));
    const cost = Number(formData.get('cost'));
    const mealName = formData.get('meal') as string;
    
    // Determine stats updates
    const leftoverPlates = Math.max(0, cooked - served);
    const wasteKgEst = parseFloat((leftoverPlates * 0.35).toFixed(2)); // Approx 350g waste per plate

    const newEntry: LeftoverEntry = {
      id: Date.now().toString(),
      meal: mealName,
      cooked,
      served,
      cost,
      timestamp: new Date().toISOString()
    };

    // Get current day shortname (e.g., 'Mon')
    const dayShort = new Date().toLocaleDateString('en-US', { weekday: 'short' });

    setData(prev => {
      // 1. Update the log list
      const updatedLeftoverDetails = [newEntry, ...prev.leftoverDetails].slice(0, 50);

      // 2. Update aggregate data for Dashboard & Charts
      const updatedMealsData = prev.mealsData.map(d => {
        if (d.day === dayShort) {
          return {
            ...d,
            prepared: d.prepared + cooked,
            served: d.served + served,
            wasteKg: d.wasteKg + wasteKgEst
          };
        }
        return d;
      });

      return { 
        ...prev, 
        leftoverDetails: updatedLeftoverDetails,
        mealsData: updatedMealsData
      };
    });

    setIsModalOpen(false);
    showToast(`${mealName} logged & stats updated!`);
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      meal: formData.get('meal') as string,
      rating: Number(formData.get('rating')),
      note: formData.get('note') as string,
      date: new Date().toISOString(),
      author: user?.username || 'Anonymous'
    };
    setData(prev => ({ ...prev, feedbackQueue: [newFeedback, ...prev.feedbackQueue].slice(0, 50) }));
    (e.target as HTMLFormElement).reset();
    showToast('Public feedback posted!');
  };
const handleExportCSV = () => {
  if (!data.leftoverDetails.length) {
    showToast('No data available to export');
    return;
  }

  const headers = [
    'Meal',
    'Cooked Plates',
    'Served Plates',
    'Leftover Plates',
    'Cost Per Plate',
    'Total Loss',
    'Date & Time'
  ];

  const rows = data.leftoverDetails.map(item => [
    item.meal,
    item.cooked,
    item.served,
    Math.max(0, item.cooked - item.served),
    item.cost,
    Math.max(0, item.cooked - item.served) * item.cost,
    new Date(item.timestamp).toLocaleString()
  ]);

  const csvContent =
    headers.join(',') + '\n' +
    rows.map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `hostel_food_waste_${new Date().toISOString().split('T')[0]}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  showToast('Excel file downloaded');
};

   

  const handleResetData = () => {
    if(window.confirm('Are you sure? This will delete all local data.')) {
      setData(SEED_DATA);
      showToast('Data reset to defaults');
    }
  };

  const refreshSuggestions = () => {
    setData(prev => ({ ...prev, suggestions: [...prev.suggestions].reverse() })); 
    showToast('AI Analysis Updated');
  };
  
  // --- Calculation Logic ---
  const getRecommendedPrep = () => {
    const baseServing = 450; 
    const randomVar = Math.floor(Math.random() * 50) - 25;
    return baseServing + randomVar;
  };

  // --- Daily Analytics Helper ---
  const getDailyAnalytics = (date: string) => {
     // Filter leftoverDetails by the selected date
     const entries = data.leftoverDetails.filter(entry => entry.timestamp.startsWith(date));
     const totalCooked = entries.reduce((acc, curr) => acc + curr.cooked, 0);
     const totalServed = entries.reduce((acc, curr) => acc + curr.served, 0);
     const totalLoss = entries.reduce((acc, curr) => acc + (curr.cooked - curr.served) * curr.cost, 0);
     const wasteCount = entries.reduce((acc, curr) => acc + Math.max(0, curr.cooked - curr.served), 0);
     
     return { entries, totalCooked, totalServed, totalLoss, wasteCount };
  };

  const totalPrepared = data.mealsData.reduce((acc, curr) => acc + curr.prepared, 0);
  const totalServed = data.mealsData.reduce((acc, curr) => acc + curr.served, 0);
  const totalWasteKg = data.mealsData.reduce((acc, curr) => acc + curr.wasteKg, 0);
  const todayLeftovers = data.leftoverDetails.reduce((acc, curr) => acc + Math.max(0, curr.cooked - curr.served), 0);
  const todayValueLost = data.leftoverDetails.reduce((acc, curr) => acc + (Math.max(0, curr.cooked - curr.served) * curr.cost), 0);

  if (!user) {
    return <AuthScreen onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  const isAdmin = user.role === 'admin';
  const cardClass = `transition-theme rounded-2xl border backdrop-blur-md shadow-lg ${theme === 'dark' ? 'bg-slate-900/70 border-white/10 text-slate-100' : 'bg-white/70 border-white/50 text-slate-800 shadow-slate-200/50'}`;
  const textMuted = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const textMain = theme === 'dark' ? 'text-slate-100' : 'text-slate-900';
  const inputClass = `w-full rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 text-slate-200' : 'bg-white/60 border-slate-300 text-slate-800'}`;
  
  // Day Index Calculation: Mon=0, Sun=6
  const getDayIndex = () => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  }
  const todayIndex = getDayIndex(); 

  const SidebarItem = ({ id, label, icon: Icon }: { id: Section, label: string, icon: React.ElementType }) => (
    <button 
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${activeSection === id ? 'bg-blue-600/20 text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : `${textMuted} hover:bg-white/10 hover:${textMain}`}`}
    >
      <Icon size={18} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen flex font-sans transition-theme bg-fixed bg-cover bg-center ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={`absolute inset-0 fixed pointer-events-none transition-theme ${theme === 'dark' ? 'bg-slate-950/80' : 'bg-slate-50/60'}`}></div>

      <aside className={`w-64 flex-shrink-0 h-screen sticky top-0 border-r flex flex-col z-30 transition-theme backdrop-blur-xl ${theme === 'dark' ? 'bg-slate-950/70 border-white/5' : 'bg-white/60 border-white/20'}`}>
        <div className="p-6 flex items-center space-x-3">
          <Logo />
          <div>
            <h1 className="font-bold text-lg tracking-tight leading-tight">Hostel Hive</h1>
            <p className={`text-[10px] uppercase font-bold tracking-wider ${isAdmin ? 'text-emerald-500' : 'text-blue-500'}`}>{isAdmin ? 'Admin Panel' : 'Student Portal'}</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {isAdmin && <SidebarItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />}
          {!isAdmin && <SidebarItem id="todays-menu" label="Today's Menu" icon={UtensilsCrossed} />}
          <SidebarItem id="menu" label="Weekly Menu" icon={Calendar} />
          {isAdmin && <SidebarItem id="meal-plans" label="AI Meal Plans" icon={BrainCircuit} />}
          {isAdmin && <SidebarItem id="daily-analytics" label="Daily Analytics" icon={FileBarChart} />}
          <SidebarItem id="feedback" label="Feedback" icon={MessageSquare} />
          {isAdmin && <SidebarItem id="reports" label="Reports" icon={FileBarChart} />}
          {isAdmin && <SidebarItem id="settings" label="Settings" icon={Settings} />}
        </nav>
        <div className={`p-4 mx-4 mb-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/50 border-white/5' : 'bg-white/50 border-white/30'}`}>
           <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
               {user.username.charAt(0).toUpperCase()}
             </div>
             <div>
               <p className={`text-sm font-bold ${textMain}`}>{user.username}</p>
               <p className={`text-xs ${textMuted} capitalize`}>{user.role}</p>
             </div>
           </div>
           <div className="flex gap-2">
            <button onClick={toggleTheme} className={`flex-1 flex items-center justify-center py-2 rounded-lg text-xs font-bold transition-colors ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-white hover:bg-slate-100 text-slate-600 shadow-sm'}`}>
               {theme === 'dark' ? <Sun size={14} className="mr-1.5" /> : <Moon size={14} className="mr-1.5" />} Theme
             </button>
             <button onClick={handleLogout} className="flex-1 flex items-center justify-center py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold transition-colors">
               <LogOut size={14} className="mr-1.5" /> Sign Out
             </button>
           </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto relative z-10 scroll-smooth">
        <header className={`sticky top-0 z-20 backdrop-blur-xl border-b px-8 py-5 flex items-center justify-between transition-theme ${theme === 'dark' ? 'bg-slate-950/60 border-white/5' : 'bg-white/50 border-white/20'}`}>
          <div>
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <h2 className={`text-2xl font-bold ${textMain}`}>
              {activeSection === 'dashboard' && 'Dashboard Overview'}
              {activeSection === 'menu' && 'Weekly Menu'}
              {activeSection === 'todays-menu' && "Today's Menu"}
              {activeSection === 'meal-plans' && 'AI Meal Planner'}
              {activeSection === 'daily-analytics' && 'Daily Analytics'}
              {activeSection === 'feedback' && 'Community Feedback'}
              {activeSection === 'reports' && 'Analytics Reports'}
              {activeSection === 'settings' && 'System Configuration'}
            </h2>
          </div>
          <div className="flex items-center space-x-3">
             <button onClick={() => setBgImage(BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)])} className={`hidden md:block p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'} transition-colors`}>
                <ImageIcon size={20} className={textMuted} />
             </button>
             {isAdmin && activeSection === 'menu' && (
                <button 
                  onClick={() => setIsEditingMenu(!isEditingMenu)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all text-sm font-bold shadow-sm ${isEditingMenu ? 'bg-blue-600 text-white border-blue-500' : theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'}`}
                >
                  {isEditingMenu ? <Save size={16} /> : <Edit2 size={16} />}
                  <span>{isEditingMenu ? 'Done Editing' : 'Edit Menu'}</span>
                </button>
             )}
             {isAdmin && activeSection === 'dashboard' && (
                <>
                  <button onClick={handleExportCSV} className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all text-sm font-bold shadow-sm ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <Download size={16} /> <span>Export</span>
                  </button>
                  <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all text-sm font-bold">
                    <Plus size={16} /> <span>Log Stats</span>
                  </button>
                </>
             )}
             {isAdmin && activeSection === 'meal-plans' && (
                <button onClick={refreshSuggestions} className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all text-sm font-bold shadow-sm ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <RefreshCw size={16} /> <span>Refresh AI</span>
                </button>
             )}
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
          
          {/* Dashboard Stats */}
          {activeSection === 'dashboard' && isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard label="Meals Prepared" value={formatNumber(totalPrepared)} trend="+6%" trendUp={true} theme={theme} cardClass={cardClass} textMain={textMain} textMuted={textMuted} />
              <StatCard label="Plates Served" value={formatNumber(totalServed)} trend="+3%" trendUp={true} theme={theme} cardClass={cardClass} textMain={textMain} textMuted={textMuted} />
              <StatCard label="Total Waste" value={`${totalWasteKg.toFixed(1)} kg`} subtext={`${formatNumber(todayLeftovers)} plates left today`} trendColor="text-rose-500" theme={theme} cardClass={cardClass} textMain={textMain} textMuted={textMuted} />
              <StatCard label="Avg Cost / Plate" value={formatCurrency(data.costPerPlate)} subtext="Editable in Settings" theme={theme} cardClass={cardClass} textMain={textMain} textMuted={textMuted} />
              <StatCard label="Projected Savings" value={formatCurrency(todayValueLost)} subtext="Recoverable value" highlight={true} theme={theme} cardClass={cardClass} textMain={textMain} textMuted={textMuted} />
              
              <div className={`${cardClass} col-span-1 md:col-span-2 lg:col-span-3 p-6 min-h-[300px]`}>
                 <div className="flex justify-between items-center mb-6">
                   <h3 className={`font-bold text-lg ${textMain}`}>Consumption Trend</h3>
                   <div className="flex space-x-2 text-xs font-bold">
                      <span className="flex items-center text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>Served</span>
                      <span className="flex items-center text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>Prepared</span>
                   </div>
                 </div>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.mealsData}>
                        <defs>
                          <linearGradient id="colorServed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPrep" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{borderRadius: '12px', border: 'none', background: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                          itemStyle={{color: theme === 'dark' ? '#fff' : '#1e293b'}}
                        />
                        <Area type="monotone" dataKey="served" stroke="#60A5FA" strokeWidth={3} fillOpacity={1} fill="url(#colorServed)" />
                        <Area type="monotone" dataKey="prepared" stroke="#34D399" strokeWidth={3} fillOpacity={1} fill="url(#colorPrep)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className={`${cardClass} col-span-1 md:col-span-2 lg:col-span-2 p-6`}>
                <h3 className={`font-bold text-lg mb-4 ${textMain}`}>Daily Waste Log</h3>
                <div className="space-y-4">
                  {data.leftoverDetails.slice(0, 4).map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                           <UtensilsCrossed size={16} className={textMuted} />
                         </div>
                         <div>
                           <p className={`text-sm font-bold ${textMain}`}>{item.meal}</p>
                           <p className={`text-xs ${textMuted}`}>{item.served} / {item.cooked} plates</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-rose-500">{item.cooked - item.served} Left</p>
                         <p className={`text-xs ${textMuted}`}>₹{(item.cooked - item.served) * item.cost} Loss</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Daily Analytics Section (Admin Only) */}
          {activeSection === 'daily-analytics' && isAdmin && (
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 shadow-sm'}`}>
                         <Calendar size={20} />
                      </div>
                      <div>
                         <h3 className={`text-xl font-bold ${textMain}`}>Daily Performance</h3>
                         <p className={`text-sm ${textMuted}`}>Deep dive into specific date metrics</p>
                      </div>
                   </div>
                   <input 
                      type="date" 
                      value={analyticsDate} 
                      onChange={(e) => setAnalyticsDate(e.target.value)}
                      className={`px-4 py-2 rounded-xl border font-medium outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-800'}`}
                   />
                </div>

                {(() => {
                   const stats = getDailyAnalytics(analyticsDate);
                   return (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <div className={`${cardClass} p-5 text-center`}>
                              <p className={`text-xs font-bold uppercase mb-2 ${textMuted}`}>Total Cooked</p>
                              <p className={`text-2xl font-bold ${textMain}`}>{stats.totalCooked}</p>
                           </div>
                           <div className={`${cardClass} p-5 text-center`}>
                              <p className={`text-xs font-bold uppercase mb-2 ${textMuted}`}>Total Served</p>
                              <p className={`text-2xl font-bold ${textMain}`}>{stats.totalServed}</p>
                           </div>
                           <div className={`${cardClass} p-5 text-center`}>
                              <p className={`text-xs font-bold uppercase mb-2 ${textMuted}`}>Waste %</p>
                              <p className={`text-2xl font-bold ${stats.wasteCount > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                 {stats.totalCooked > 0 ? ((stats.wasteCount / stats.totalCooked) * 100).toFixed(1) : 0}%
                              </p>
                           </div>
                           <div className={`${cardClass} p-5 text-center`}>
                              <p className={`text-xs font-bold uppercase mb-2 ${textMuted}`}>Financial Loss</p>
                              <p className="text-2xl font-bold text-rose-500">{formatCurrency(stats.totalLoss)}</p>
                           </div>
                        </div>

                        {stats.entries.length > 0 ? (
                           <div className={`${cardClass} p-6`}>
                              <h4 className={`font-bold text-lg mb-4 ${textMain}`}>Meal Breakdown</h4>
                              <div className="space-y-4">
                                 {stats.entries.map(entry => (
                                    <div key={entry.id} className="relative pt-1">
                                       <div className="flex mb-2 items-center justify-between">
                                          <div>
                                             <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'}`}>
                                                {entry.meal}
                                             </span>
                                          </div>
                                          <div className="text-right">
                                             <span className={`text-xs font-semibold inline-block ${textMain}`}>
                                                {((entry.served / entry.cooked) * 100).toFixed(0)}% Consumed
                                             </span>
                                          </div>
                                       </div>
                                       <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                          <div style={{ width: `${(entry.served / entry.cooked) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                                          <div style={{ width: `${((entry.cooked - entry.served) / entry.cooked) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-rose-500"></div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ) : (
                           <div className={`${cardClass} p-12 text-center`}>
                              <p className={textMuted}>No records found for this date.</p>
                           </div>
                        )}
                      </>
                   );
                })()}
             </div>
          )}
          
          {/* AI Meal Plans Section */}
          {activeSection === 'meal-plans' && isAdmin && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Optimization Engine */}
                <div className={`${cardClass} p-6`}>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-violet-500/10 rounded-xl text-violet-500">
                        <BrainCircuit size={24} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${textMain}`}>Optimization Engine</h3>
                        <p className={`text-xs ${textMuted}`}>AI-driven suggestions to reduce waste</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      {data.suggestions.map((s, i) => (
                        <div key={i} className={`p-4 rounded-xl border transition-all hover:scale-[1.01] ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-white/60 border-slate-200'}`}>
                           <div className="flex justify-between items-start mb-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                s.type === 'Portion' ? 'bg-blue-500/10 text-blue-500' :
                                s.type === 'Menu' ? 'bg-emerald-500/10 text-emerald-500' :
                                'bg-amber-500/10 text-amber-500'
                              }`}>{s.type}</span>
                           </div>
                           <p className={`text-sm font-medium ${textMain}`}>{s.text}</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Demand Forecast */}
                <div className={`${cardClass} p-6`}>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${textMain}`}>7-Day Demand Forecast</h3>
                        <p className={`text-xs ${textMuted}`}>Predicted turnout based on events</p>
                      </div>
                   </div>
                   <div className="space-y-0 relative">
                      {/* Timeline Line */}
                      <div className={`absolute left-[19px] top-4 bottom-4 w-0.5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                      
                      {data.forecastData.map((f, i) => (
                        <div key={i} className="flex gap-4 relative z-10 py-3">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-4 shrink-0 ${theme === 'dark' ? 'bg-slate-900 border-slate-950 text-slate-300' : 'bg-white border-slate-50 text-slate-600 shadow-sm'}`}>
                             {f.day.substring(0,2)}
                           </div>
                           <div className="flex-1">
                              <h4 className={`text-sm font-bold ${textMain}`}>{f.focus}</h4>
                              <p className="text-xs font-bold text-blue-500 mt-1">{f.action}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Smart Production Calculator */}
                <div className={`${cardClass} col-span-1 lg:col-span-2 p-8`}>
                   <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1 space-y-6">
                         <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                              <Calculator size={24} />
                            </div>
                            <div>
                              <h3 className={`font-bold text-lg ${textMain}`}>Smart Production Calculator</h3>
                              <p className={`text-xs ${textMuted}`}>Calculate exact quantities to cook</p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className={`block text-xs font-bold mb-2 ${textMuted}`}>Select Day</label>
                               <select 
                                 className={inputClass}
                                 value={calcDay}
                                 onChange={(e) => setCalcDay(e.target.value)}
                               >
                                 {data.weeklyMenu.map(m => <option key={m.day}>{m.day}</option>)}
                               </select>
                            </div>
                            <div>
                               <label className={`block text-xs font-bold mb-2 ${textMuted}`}>Select Meal</label>
                               <select 
                                 className={inputClass}
                                 value={calcMeal}
                                 onChange={(e) => setCalcMeal(e.target.value)}
                               >
                                 <option>Breakfast</option>
                                 <option>Lunch</option>
                                 <option>Dinner</option>
                               </select>
                            </div>
                         </div>

                         <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-blue-900/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                            <div className="flex items-start gap-3">
                               <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                               <p className={`text-xs ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                                  Prediction uses a <strong>Weighted Moving Average</strong> of the last 4 weeks of consumption data for {calcDay} {calcMeal}, adjusted for current student feedback sentiment.
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className={`w-full md:w-80 p-6 rounded-xl border flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}`}>
                          <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${textMuted}`}>Recommended Prep</p>
                          <div className="text-5xl font-bold text-blue-500 mb-2">{getRecommendedPrep()}</div>
                          <p className={`text-sm font-medium ${textMain}`}>Plates</p>
                          <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-4"></div>
                          <div className="flex justify-between w-full text-xs">
                             <span className={textMuted}>Safety Buffer</span>
                             <span className="font-bold text-emerald-500">+5% Included</span>
                          </div>
                      </div>
                   </div>
                </div>
             </div>
          )}
          
          {/* Reports Section (Admin Only) */}
          {activeSection === 'reports' && isAdmin && (
            <div className="space-y-6">
              <div className={`${cardClass} p-6`}>
                <h3 className={`text-xl font-bold mb-6 ${textMain}`}>Waste Analysis Report</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.mealsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: theme === 'dark' ? '#94a3b8' : '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: theme === 'dark' ? '#94a3b8' : '#64748b'}} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', background: theme === 'dark' ? '#1e293b' : '#fff'}} />
                      <Legend />
                      <Bar dataKey="prepared" name="Prepared" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="served" name="Consumed" fill="#34D399" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="wasteKg" name="Waste (Kg)" fill="#FB7185" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className={`${cardClass} p-6`}>
                    <h4 className={`font-bold text-lg mb-4 ${textMain}`}>Weekly Summary</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                          <span className={textMuted}>Total Prepared</span>
                          <span className={`font-bold ${textMain}`}>{formatNumber(totalPrepared)} plates</span>
                       </div>
                       <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                          <span className={textMuted}>Total Consumed</span>
                          <span className={`font-bold ${textMain}`}>{formatNumber(totalServed)} plates</span>
                       </div>
                       <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                          <span className={textMuted}>Efficiency Rate</span>
                          <span className="font-bold text-emerald-500">{((totalServed/totalPrepared)*100).toFixed(1)}%</span>
                       </div>
                       <div className="flex justify-between">
                          <span className={textMuted}>Financial Loss</span>
                          <span className="font-bold text-rose-500">~{formatCurrency(totalWasteKg * 15 * 5)}</span>
                       </div>
                    </div>
                 </div>
                 <div className={`${cardClass} p-6 flex flex-col justify-center items-center text-center`}>
                    <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500 mb-4">
                       <Check size={32} />
                    </div>
                    <h4 className={`font-bold text-lg ${textMain}`}>System Health</h4>
                    <p className={`text-sm mt-2 ${textMuted}`}>Data collection is active and optimal. Next automated report generation is scheduled for Sunday, 11:00 PM.</p>
                 </div>
              </div>
            </div>
          )}

          {/* New Section: Today's Menu (Student Only) */}
          {activeSection === 'todays-menu' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className={`${cardClass} p-8 text-center relative overflow-hidden`}>
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                 <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Today's Special</h2>
                 <p className={`text-lg font-medium ${textMain}`}>{data.weeklyMenu[todayIndex].day}</p>
                 <p className={`text-sm ${textMuted} mt-1`}>{new Date().toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</p>
              </div>

              {/* Breakfast Card */}
              <div className={`${cardClass} overflow-hidden transform transition-all hover:scale-[1.01] duration-300`}>
                <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-3">
                   <div className="p-2 bg-amber-500 text-white rounded-lg shadow-lg shadow-amber-500/30">
                     <Sunrise size={20} />
                   </div>
                   <h3 className="font-bold text-amber-600 dark:text-amber-400 text-lg">Breakfast</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                   {data.weeklyMenu[todayIndex].breakfast.map((item) => (
                      <div key={item.id} className={`p-4 rounded-xl border flex justify-between items-center ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}`}>
                         <div>
                            <p className={`font-bold text-lg ${textMain}`}>{item.name}</p>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.category === 'Veg' ? 'bg-emerald-500/10 text-emerald-500' : item.category === 'Non-Veg' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>{item.category}</span>
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>Rate it</span>
                            <StarRating rating={getItemRating(item.id)} onRate={(r) => handleRateItem(item.id, item.name, r)} />
                         </div>
                      </div>
                   ))}
                </div>
              </div>

              {/* Lunch Card */}
              <div className={`${cardClass} overflow-hidden transform transition-all hover:scale-[1.01] duration-300`}>
                <div className="p-4 bg-blue-500/10 border-b border-blue-500/20 flex items-center gap-3">
                   <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/30">
                     <UtensilsCrossed size={20} />
                   </div>
                   <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">Lunch</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                   {data.weeklyMenu[todayIndex].lunch.map((item) => (
                      <div key={item.id} className={`p-4 rounded-xl border flex justify-between items-center ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}`}>
                         <div>
                            <p className={`font-bold text-lg ${textMain}`}>{item.name}</p>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.category === 'Veg' ? 'bg-emerald-500/10 text-emerald-500' : item.category === 'Non-Veg' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>{item.category}</span>
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>Rate it</span>
                            <StarRating rating={getItemRating(item.id)} onRate={(r) => handleRateItem(item.id, item.name, r)} />
                         </div>
                      </div>
                   ))}
                </div>
              </div>

              {/* Dinner Card */}
              <div className={`${cardClass} overflow-hidden transform transition-all hover:scale-[1.01] duration-300`}>
                <div className="p-4 bg-indigo-500/10 border-b border-indigo-500/20 flex items-center gap-3">
                   <div className="p-2 bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/30">
                     <Sunset size={20} />
                   </div>
                   <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">Dinner</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                   {data.weeklyMenu[todayIndex].dinner.map((item) => (
                      <div key={item.id} className={`p-4 rounded-xl border flex justify-between items-center ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}`}>
                         <div>
                            <p className={`font-bold text-lg ${textMain}`}>{item.name}</p>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.category === 'Veg' ? 'bg-emerald-500/10 text-emerald-500' : item.category === 'Non-Veg' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>{item.category}</span>
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>Rate it</span>
                            <StarRating rating={getItemRating(item.id)} onRate={(r) => handleRateItem(item.id, item.name, r)} />
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu Section */}
          {activeSection === 'menu' && (
            <div className="space-y-6">
              {!isEditingMenu && (
                <div className={`${cardClass} p-6 border-l-4 border-l-blue-500 flex justify-between items-center`}>
                  <div>
                    <h3 className={`text-lg font-bold ${textMain} mb-1`}>Weekly Overview</h3>
                    <p className={`text-sm ${textMuted}`}>Check the ratings and see what others are saying.</p>
                  </div>
                  <div className="text-right hidden sm:block">
                     <p className={`text-2xl font-bold ${textMain}`}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.weeklyMenu.map((dayMenu, dayIdx) => (
                  <div key={dayIdx} className={`${cardClass} overflow-hidden hover:border-blue-500/30 transition-all ${dayIdx === todayIndex ? 'ring-2 ring-blue-500/50' : ''}`}>
                    <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/50 border-slate-100'}`}>
                      <h4 className={`font-bold text-lg ${dayIdx === todayIndex ? 'text-blue-500' : textMain}`}>{dayMenu.day}</h4>
                      {dayIdx === todayIndex && <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TODAY</span>}
                    </div>
                    <div className="p-4 space-y-5">
                      {[{l: 'breakfast', items: dayMenu.breakfast}, {l: 'lunch', items: dayMenu.lunch}, {l: 'dinner', items: dayMenu.dinner}].map((meal, mealIdx) => (
                         <div key={mealIdx} className={mealIdx > 0 ? `border-t pt-4 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}` : ''}>
                            <div className="flex justify-between items-center mb-2">
                               <p className={`text-[10px] uppercase tracking-wider font-bold ${textMuted}`}>{meal.l}</p>
                               {isEditingMenu && (
                                 <button onClick={() => handleAddMenuItem(dayIdx, meal.l as any)} className="text-blue-500 hover:text-blue-400">
                                   <Plus size={14} />
                                 </button>
                               )}
                            </div>
                            <div className="space-y-2">
                              {(meal.items as MenuItem[]).map((item, itemIdx) => {
                                const stats = getItemStats(item.id);
                                return (
                                  <div key={item.id} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-sm items-start">
                                      {isEditingMenu ? (
                                        <div className="flex-1 flex gap-2">
                                          <input 
                                            value={item.name} 
                                            onChange={(e) => handleUpdateMenuItem(dayIdx, meal.l as any, itemIdx, 'name', e.target.value)}
                                            className={`${inputClass} !py-1 !text-xs`}
                                          />
                                          <select 
                                            value={item.category}
                                            onChange={(e) => handleUpdateMenuItem(dayIdx, meal.l as any, itemIdx, 'category', e.target.value)}
                                            className={`${inputClass} !w-24 !py-1 !text-xs`}
                                          >
                                            <option>Veg</option>
                                            <option>Non-Veg</option>
                                            <option>Special</option>
                                          </select>
                                          <button onClick={() => handleDeleteMenuItem(dayIdx, meal.l as any, itemIdx)} className="text-rose-500 p-1 hover:bg-rose-500/10 rounded">
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className={`font-medium ${textMain}`}>{item.name}</span>
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                              item.category === 'Veg' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
                                              item.category === 'Non-Veg' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : 
                                              'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                            }`}>{item.category}</span>
                                          </div>
                                          {/* User interaction: Star Rating */}
                                          {!isAdmin && (
                                            <StarRating 
                                              rating={getItemRating(item.id)} 
                                              onRate={(r) => handleRateItem(item.id, item.name, r)} 
                                            />
                                          )}
                                          {/* Admin View: Average Stats */}
                                          {isAdmin && (
                                             <StarRating readOnly avgRating={stats.avg} count={stats.count} rating={0} />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                         </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Section */}
          {activeSection === 'feedback' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className={`${cardClass} p-6 lg:col-span-1 h-fit sticky top-24`}>
                 <h3 className={`text-lg font-bold mb-4 ${textMain}`}>Write a Review</h3>
                 <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Meal Period</label>
                      <select name="meal" className={inputClass}>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Overall Experience (1-5)</label>
                      <input type="number" name="rating" min="1" max="5" defaultValue="4" className={inputClass} />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Comment</label>
                      <textarea name="note" rows={3} placeholder="Tell us more..." required className={inputClass}></textarea>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/20">Post Public Feedback</button>
                 </form>
               </div>
               
               <div className={`${cardClass} p-6 lg:col-span-2`}>
                 <div className="flex justify-between items-center mb-6">
                   <h3 className={`text-lg font-bold ${textMain}`}>Community Feed</h3>
                   <span className={`text-xs px-2 py-1 rounded font-bold ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{data.feedbackQueue.length} posts</span>
                 </div>
                 <div className="space-y-4">
                   {data.feedbackQueue.map((f) => (
                     <div key={f.id} className={`flex flex-col p-5 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' : 'bg-white/40 border-slate-200 hover:bg-white/60'}`}>
                        <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center space-x-2">
                             <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">{f.author.charAt(0).toUpperCase()}</div>
                             <span className={`text-sm font-bold ${textMain}`}>{f.author}</span>
                             <span className={`text-xs ${textMuted}`}>•</span>
                             <span className={`text-xs ${textMuted}`}>{f.meal}</span>
                           </div>
                           <div className="flex text-amber-400 text-xs">
                              {[...Array(5)].map((_, i) => (<span key={i} className={i < f.rating ? 'opacity-100' : 'opacity-20'}>★</span>))}
                           </div>
                        </div>
                        <p className={`text-sm leading-relaxed pl-9 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{f.note}</p>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}

          {/* Settings Section (Admin Only) */}
          {activeSection === 'settings' && isAdmin && (
             <div className={`${cardClass} p-8 max-w-2xl`}>
                <h3 className={`text-xl font-bold mb-6 ${textMain}`}>System Configuration</h3>
                <div className="space-y-6">
                  <div className={`flex items-center justify-between pb-6 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div>
                      <p className={`font-bold ${textMain}`}>Cost Per Plate (₹)</p>
                      <p className={`text-xs ${textMuted}`}>Base calculation for financial loss</p>
                    </div>
                    <input type="number" value={data.costPerPlate} onChange={(e) => setData({...data, costPerPlate: Number(e.target.value)})} className={`w-24 px-3 py-2 text-right rounded-lg border ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-800'}`} />
                  </div>
                  <div className={`flex items-center justify-between pb-6 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div>
                      <p className={`font-bold ${textMain}`}>Data Management</p>
                      <p className={`text-xs ${textMuted}`}>Local storage controls</p>
                    </div>
                    <button onClick={handleResetData} className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-sm font-bold border border-rose-500/30 transition-colors">Reset All Data</button>
                  </div>
                </div>
             </div>
          )}
        </div>
      </main>

      {/* Admin Modal for Logging */}
      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className={`${cardClass} relative w-full max-w-md p-6 transform transition-all shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-bold ${textMain}`}>Log Meal Stats</h3>
              <button onClick={() => setIsModalOpen(false)} className={`${textMuted} hover:${textMain}`}>✕</button>
            </div>
            <form onSubmit={handleLogMeal} className="space-y-4">
               <div>
                 <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Meal Name</label>
                 <input type="text" name="meal" placeholder="e.g. Breakfast" required className={inputClass} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Cooked</label>
                   <input type="number" name="cooked" defaultValue={200} required className={inputClass} />
                 </div>
                 <div>
                   <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Served</label>
                   <input type="number" name="served" defaultValue={180} required className={inputClass} />
                 </div>
               </div>
               <div>
                 <label className={`block text-xs font-bold mb-1 ${textMuted}`}>Cost per Plate (₹)</label>
                 <input type="number" name="cost" defaultValue={data.costPerPlate} required className={inputClass} />
               </div>
               <div className="pt-4 flex space-x-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold ${theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>Cancel</button>
                 <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25">Save Entry</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center space-x-3 animate-bounce-in z-50 font-medium">
          <AlertCircle size={20} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// Sub-component for Stats
function StatCard({ label, value, subtext, trend, trendUp, trendColor, highlight, theme, cardClass, textMain, textMuted }: any) {
  return (
    <div className={`${cardClass} p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${highlight ? (theme === 'dark' ? 'border-indigo-500/40 bg-indigo-900/10' : 'border-indigo-500/30 bg-indigo-50/80') : ''}`}>
       <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${textMuted}`}>{label}</p>
       <div className="flex items-end justify-between">
         <p className={`text-2xl font-bold ${textMain}`}>{value}</p>
         {trend && (
           <div className={`flex items-center text-xs font-bold ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
             {trendUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
             {trend}
           </div>
         )}
       </div>
       {(subtext || trendColor) && (
         <p className={`text-xs mt-2 font-medium ${trendColor || textMuted}`}>
           {subtext || trendColor}
         </p>
       )}
    </div>
  );
}

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, CartItem, Product, Order, Membership } from '../types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  user: null,
  cart: [],
  products: [
    {
      id: '1',
      name: 'Premium Strawberries',
      category: 'berries',
      price: 8.99,
      unit: 'lb',
      image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Fresh, juicy strawberries picked at peak ripeness',
      inStock: true,
      featured: true,
      nutrition: { calories: 32, fiber: 2, vitaminC: 58 }
    },
    {
      id: '2',
      name: 'Tropical Mango',
      category: 'tropical',
      price: 3.49,
      unit: 'each',
      image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Sweet, ripe mangoes with tropical flavor',
      inStock: true,
      featured: true,
      nutrition: { calories: 60, fiber: 3, vitaminC: 36 }
    },
    {
      id: '3',
      name: 'Organic Blueberries',
      category: 'berries',
      price: 6.99,
      unit: 'container',
      image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Antioxidant-rich organic blueberries',
      inStock: true,
      featured: true,
      nutrition: { calories: 84, fiber: 4, vitaminC: 14 }
    },
    {
      id: '4',
      name: 'Fresh Avocados',
      category: 'tropical',
      price: 2.99,
      unit: 'each',
      image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Creamy, perfectly ripe avocados',
      inStock: true,
      featured: false,
      nutrition: { calories: 160, fiber: 7, vitaminC: 10 }
    },
    {
      id: '5',
      name: 'Navel Oranges',
      category: 'citrus',
      price: 4.99,
      unit: 'bag',
      image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Sweet, juicy navel oranges',
      inStock: true,
      featured: false,
      nutrition: { calories: 62, fiber: 3, vitaminC: 92 }
    }
  ],
  orders: [],
  memberships: [
    {
      id: '1',
      type: 'daily',
      name: 'Daily Fresh',
      price: 9.99,
      discount: 0,
      features: ['Single delivery', 'Basic fruit selection', 'Pay-per-use'],
      deliveriesPerWeek: 1,
      active: false,
      expiresAt: new Date()
    },
    {
      id: '2',
      type: 'weekly',
      name: 'Weekly Boost',
      price: 24.99,
      discount: 10,
      features: ['3 deliveries per week', 'Expanded fruit selection', '10% discount on add-ons'],
      deliveriesPerWeek: 3,
      active: false,
      expiresAt: new Date()
    },
    {
      id: '3',
      type: 'monthly',
      name: 'Monthly Premium',
      price: 89.99,
      discount: 20,
      features: ['Daily delivery options', 'Premium fruit selection', '20% discount on all orders', 'Priority delivery'],
      deliveriesPerWeek: 7,
      active: false,
      expiresAt: new Date()
    }
  ]
};

function appReducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_MEMBERSHIP':
      return {
        ...state,
        user: state.user ? { ...state.user, membership: action.payload } : null
      };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
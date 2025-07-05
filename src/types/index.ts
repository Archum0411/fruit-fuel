export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  membership?: Membership;
  avatar?: string;
}

export interface Membership {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  name: string;
  price: number;
  discount: number;
  features: string[];
  deliveriesPerWeek: number;
  active: boolean;
  expiresAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  featured: boolean;
  nutrition: {
    calories: number;
    fiber: number;
    vitaminC: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryDate: Date;
  qrCodeUrl?: string;
}

export interface AppState {
  user: User | null;
  cart: CartItem[];
  products: Product[];
  orders: Order[];
  memberships: Membership[];
}
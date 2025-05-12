export interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  avatarUrl?: string;
  ecoCoins: number;
  ecotabCardNumber: string;
  totalSteps: number;
  dailyGoal: number;
  preferences: {
    walkingSpeed: "slow" | "moderate" | "fast";
    runningSpeed: "slow" | "moderate" | "fast";
    preferredDistance: number; // in kilometers
  };
}

export interface Activity {
  id: string;
  userId: string;
  type: "walk" | "run";
  steps: number;
  distance: number; // in kilometers
  coins: number;
  duration: number; // in minutes
  date: Date;
  route?: {
    startLocation: string;
    endLocation: string;
    coordinates: [number, number][]; // [longitude, latitude]
  };
}

export interface PartnerStore {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  distance: number; // in kilometers (calculated based on user location)
  imageUrl: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "earning" | "transfer" | "redemption";
  description: string;
  date: Date;
  storeId?: string;
}

export interface GiftCard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isUnlocked: boolean;
  requiredCompletions: number;
  backgroundColor: string;
  textColor: string;
}

// Mock user data
export const mockUser: UserProfile = {
  id: "user-1",
  name: "Alex Johnson",
  age: 28,
  location: "San Francisco, CA",
  avatarUrl: "https://i.pravatar.cc/150?img=33",
  ecoCoins: 1245,
  ecotabCardNumber: "6137902584361092",
  totalSteps: 8437,
  dailyGoal: 10000,
  preferences: {
    walkingSpeed: "moderate",
    runningSpeed: "moderate",
    preferredDistance: 5,
  },
};

// Mock activity data
export const mockActivities: Activity[] = [
  {
    id: "activity-1",
    userId: "user-1",
    type: "run",
    steps: 12350,
    distance: 9.8,
    coins: 123,
    duration: 65, // minutes
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "activity-2",
    userId: "user-1",
    type: "walk",
    steps: 8720,
    distance: 5.4,
    coins: 87,
    duration: 72, // minutes
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "activity-3",
    userId: "user-1",
    type: "run",
    steps: 14560,
    distance: 11.2,
    coins: 145,
    duration: 82, // minutes
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "activity-4",
    userId: "user-1",
    type: "walk",
    steps: 6240,
    distance: 3.8,
    coins: 62,
    duration: 45, // minutes
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
];

// Mock partner stores
export const mockPartnerStores: PartnerStore[] = [
  {
    id: "store-1",
    name: "Green Leaf Café",
    category: "Food & Drink",
    description: "Organic café with sustainable practices",
    address: "123 Pine Street",
    coordinates: [-122.4194, 37.7749], // San Francisco coordinates
    distance: 0.7, // kilometers
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "store-2",
    name: "EcoSports Gear",
    category: "Retail",
    description: "Sports equipment made from recycled materials",
    address: "456 Market Street",
    coordinates: [-122.4253, 37.7955],
    distance: 1.2,
    imageUrl: "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
  },
  {
    id: "store-3",
    name: "Sustainable Threads",
    category: "Fashion",
    description: "Eco-friendly clothing and accessories",
    address: "789 Mission Street",
    coordinates: [-122.4058, 37.7850],
    distance: 2.4,
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "store-4",
    name: "Natural Remedies",
    category: "Health",
    description: "Organic health products and supplements",
    address: "987 Howard Street",
    coordinates: [-122.4103, 37.7837],
    distance: 3.1,
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    userId: "user-1",
    amount: 123,
    type: "earning",
    description: "Morning run",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "tx-2",
    userId: "user-1",
    amount: 50,
    type: "transfer",
    description: "Transfer to EcoTab Card",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "tx-3",
    userId: "user-1",
    amount: 25,
    type: "redemption",
    description: "Discount at Green Leaf Café",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    storeId: "store-1",
  },
];

// Mock gift cards
export const mockGiftCards: GiftCard[] = [
  {
    id: "gift-1",
    name: "Starbucks",
    description: "10% off any purchase at Starbucks",
    imageUrl: "https://images.unsplash.com/photo-1507226983735-a838615193b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isUnlocked: false,
    requiredCompletions: 1,
    backgroundColor: "#00704A",
    textColor: "text-white"
  },
  {
    id: "gift-2",
    name: "Amazon",
    description: "5$ gift card for Amazon",
    imageUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isUnlocked: false,
    requiredCompletions: 3,
    backgroundColor: "#FF9900",
    textColor: "text-black"
  },
  {
    id: "gift-3",
    name: "Nike",
    description: "15% off on your next purchase",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isUnlocked: false,
    requiredCompletions: 5,
    backgroundColor: "#F1F1F1",
    textColor: "text-black"
  },
  {
    id: "gift-4",
    name: "Spotify",
    description: "1 month premium subscription",
    imageUrl: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isUnlocked: false,
    requiredCompletions: 7,
    backgroundColor: "#1DB954",
    textColor: "text-white"
  }
];

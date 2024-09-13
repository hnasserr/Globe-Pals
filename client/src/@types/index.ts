export type User = {
  _id: string,
  email: string,
  password: string, 
  username: string,
  firstName: string,
  lastName: string,
  birthdate: string,
  bio: string,
  avatar: { 
    url: string,
    public_id: string
  }
}

export type NewUser = {
  email: string,
  password: string, 
  username: string,
  date: Date,
  bio: string,
  avatar: string
}

export type NotOk = { 
  error: string;
}


export interface Trip {
  _id: string; // MongoDB generates a unique id for each trip
  title: string;
  destination: string;
  description: string;
  startDate: string; // Date as a string (ISO format)
  endDate: string; // Date as a string (ISO format)
  itinerary: ItineraryDay[];
  accommodation: Accommodation;
  transportation: Transportation;
  budget: Budget;
  groupSize: GroupSize;
  participants: string[]; // Array of user IDs (MongoDB ObjectId)
  tripLeader: string; // User ID of the trip leader
  packingList: string[];
  safetyInfo?: string;
  mealPlans?: string;
  cancellationPolicy?: string;
  tripStatus: 'Upcoming' | 'Ongoing' | 'Completed' | 'Canceled';
  spotsAvailable: number;
  activityLevel: 'Low' | 'Moderate' | 'High';
  travelPreferences?: string;
  media: Media;
  comments?: Comment[]; // Assuming you have a type for comments
  createdAt: string;
  updatedAt: string;
}

interface ItineraryDay {
  day: number;
  activities: string[];
}

interface Accommodation {
  name: string;
  address: string;
  type?: string; // Optional, e.g., Hotel, Hostel, Airbnb
  contactInfo?: string;
}

interface Transportation {
  mode?: string; // e.g., Car, Flight, Bus
  details?: string;
}

interface Budget {
  totalCost: {
    total: number;
    currency: string;
  };
  costBreakdown?: {
    accommodation?: number;
    transportation?: number;
    food?: number;
    activities?: number;
  };
}

interface GroupSize {
  maxParticipants: number;
  currentParticipants: number;
}

interface Media {
  photos?: {
    url: string;
    public_id?: string;
  }[];
  videos?: {
    url: string;
    public_id?: string;
  }[];
}

interface Comment {
  user: string;
  text: string;
  createdAt: string;
}

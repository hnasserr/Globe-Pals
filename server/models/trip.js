import mongoose from 'mongoose';
import { commentSchema } from './comments.js';

const tripSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  itinerary: [
    {
      day: { 
        type: Number, 
        required: true 
      },
      activities: [ 
        { 
          type: String, 
          required: true 
        } 
      ]
    }
  ],
  accommodation: {
    name: String,
    address: String,
    type: { type: String },  // e.g., Hotel, Hostel, Airbnb, etc.
    contactInfo: String
  },
  transportation: {
    mode: String,  // e.g., Car, Flight, Bus
    details: String  // e.g., Flight number, Car rental company
  },
  budget: {
    totalCost: { 
      total: {type: Number, required: true} , 
      currency: { type: String, required: true }
    },
    costBreakdown: {
      accommodation: Number,
      transportation: Number,
      food: Number,
      activities: Number
    }
  },
  groupSize: {
    maxParticipants: { 
      type: Number, 
      required: true 
    },
    currentParticipants: { 
      type: Number, 
      default: 1 
    }
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tripLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  packingList: [ 
    { 
      type: String 
    } 
  ],
  safetyInfo: { 
    type: String 
  },
  mealPlans: { 
    type: String 
  },
  cancellationPolicy: { 
    type: String 
  },
  tripStatus: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Canceled'],
    default: 'Upcoming'
  },
  spotsAvailable: {
    type: Number,
    required: true
  },
  activityLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true
  },
  travelPreferences: {
    type: String 
  },
  media: {
    photos: [ 
      { 
        type: String 
      } 
    ],
    videos: [ 
      { 
        type: String 
      } 
    ]
  },
  comments: [commentSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export const TripModel = mongoose.model('Trip', tripSchema);

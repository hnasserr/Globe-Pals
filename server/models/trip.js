import mongoose from 'mongoose';

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
    type: String,  // e.g., Hotel, Hostel, Airbnb, etc.
    contactInfo: String
  },
  transportation: {
    mode: String,  // e.g., Car, Flight, Bus
    details: String  // e.g., Flight number, Car rental company
  },
  budget: {
    totalCost: { 
      type: Number, 
      required: true 
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
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const TripModel = mongoose.model('Trip', tripSchema);

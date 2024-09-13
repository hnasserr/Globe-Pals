import { TripModel } from '../models/trip.js';

export const createTrip = async (req, res) => {
  console.log('Request received :>> ', req.body);
  const { title, description, destination, startDate, endDate, accommodation, transportation, itinerary, groupSize, budget, packingList, safetyInfo, mealPlans, cancellationPolicy, tripStatus, media, spotsAvailable, activityLevel, travelPreferences,  createdAt, updatedAt } = req.body;
  const userId = req.user.id;
  console.log(req.body);

  try {
    
    let photosArr = null;
    if (photosArr) {
      try {
        photosArr = await imageUpload2(media.photos, "mern_project/trips");
      } catch (uploadError) {
        console.log('Error uploading avatar:', uploadError);
        // You can choose to continue without the avatar, or return an error
        // return res.status(400).json({ error: 'Error uploading avatar' });
      }
    }

    const newTrip = new TripModel({
      title,
      destination,
      description,
      startDate,
      endDate,
      itinerary,
      accommodation,
      transportation,
      budget,
      groupSize,
      tripLeader: userId, // Link trip to the user who created it
      packingList,
      safetyInfo,
      mealPlans,
      cancellationPolicy,
      tripStatus,
      spotsAvailable,
      activityLevel,
      travelPreferences,
      media,
      createdAt,
      updatedAt
    });

    const savedTrip =  await newTrip.save();

    res.status(201).json({ message: 'Trip created successfully!', trip: savedTrip });
    
  } catch (error) {
    console.log('Error creating trip:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const updateTrip = async (req, res) => {
  const tripId = req.params.id; // Get the trip ID from the URL parameters
  const userId = req.user.id;  // Get the user ID from the auth middleware
  const updateData = req.body; // Get the update data from the request body

  try {
    // Find the trip by ID and ensure the requesting user is the trip leader
    const trip = await TripModel.findOne({ _id: tripId, tripLeader: userId });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found or you are not authorized to update this trip' });
    }

    // Update the trip with the new data
    const updatedTrip = await TripModel.findByIdAndUpdate(
      tripId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Trip updated successfully!',
      trip: updatedTrip
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const deleteTrip = async (req, res) => {
  const tripId = req.params.id;

  try {
    // Find the trip by ID and delete it
    const deletedTrip = await TripModel.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully!' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const getAllTrips = async (req, res) => {
  try {
    // Find all trips in the database
    const trips = await TripModel.find();
    
    // Check if any trips are found
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    } else {
      res.status(200).json({ message: 'All trips', trips });
    }

  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const getTripById = async (req, res) => {
  const tripId = req.params.id

  try {
    const trip = await TripModel.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: ' Trip not found ' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.log('Error fetching trip!!', error);
    res.status(500).json({ error: ' Server Error please try again later ' });
  }
};


export const searchTrips = async (req, res) => {
  const { destination, startDate, endDate, minBudget, maxBudget, activityLevel, spotsAvailable } = req.query;

  // Create a query object to dynamically build the search criteria
  const query = {};

  if (destination) {
    query.destination = { $regex: destination, $options: 'i' }; // Case-insensitive search
  }
  
  if (startDate && endDate) {
    query.startDate = { $gte: new Date(startDate) };
    query.endDate = { $lte: new Date(endDate) };
  } else if (startDate) {
    query.startDate = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.endDate = { $lte: new Date(endDate) };
  }

  if (minBudget || maxBudget) {
    query['budget.totalCost.total'] = {};
    if (minBudget) query['budget.totalCost.total'].$gte = Number(minBudget);
    if (maxBudget) query['budget.totalCost.total'].$lte = Number(maxBudget);
  }

  if (activityLevel) {
    query.activityLevel = activityLevel;
  }

  if (spotsAvailable) {
    query.spotsAvailable = { $gte: Number(spotsAvailable) };
  }

  try {
    // Find trips that match the search criteria
    const trips = await TripModel.find(query);

    // Check if any trips are found
    if (trips.length === 0) {
      return res.status(404).json({ message: 'No trips found matching your criteria' });
    }

    res.status(200).json({ message: 'Trips found !!', trips });
  } catch (error) {
    console.error('Error searching trips:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const updateTripStatus = async (req, res) => {
  const tripId = req.params.id;
  const { tripStatus } = req.body;

  // Validate the status
  const validStatuses = ['Upcoming', 'Ongoing', 'Completed', 'Canceled'];
  if (!validStatuses.includes(tripStatus)) {
    return res.status(400).json({ error: 'Invalid trip status' });
  }

  try {
    // Find the trip and update the status
    const updatedTrip = await TripModel.findByIdAndUpdate(
      tripId,
      { tripStatus: tripStatus },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json({
      message: 'Trip status updated successfully!',
      trip: updatedTrip
    });
  } catch (error) {
    console.error('Error updating trip status:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const joinTrip = async (req, res) => {
  const tripId = req.params.id;
  const userId = req.user.id; // Assuming the user ID is available from the authorization middleware

  try {
    // Find the trip by ID
    const trip = await TripModel.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Check if the trip is full
    if (trip.groupSize.currentParticipants >= trip.groupSize.maxParticipants) {
      return res.status(400).json({ error: 'Trip is already full' });
    }

    // Check if the user is already the trip leader
    if (trip.tripLeader.toString() === userId) {
      return res.status(400).json({ error: 'You are already the trip leader' });
    }

    // Check if the user is already a participant
    if (trip.participants.includes(userId)) {
      return res.status(400).json({ error: 'You are already a participant in this trip' });
    }

    // Add the user to the participants array
    trip.participants.push(userId);

    // Increment the currentParticipants count
    trip.groupSize.currentParticipants += 1;

    // Update the spots available
    trip.spotsAvailable = trip.groupSize.maxParticipants - trip.groupSize.currentParticipants;

    // Save the updated trip
    await trip.save();

    res.status(200).json({ 
      message: 'Successfully joined the trip', 
      trip: trip
    });
  } catch (error) {
    console.error('Error joining trip:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const leaveTrip = async (req, res) => {
  const tripId = req.params.id;
  const userId = req.user.id; // Assuming the user ID is available from the authorization middleware

  try {
    // Find the trip by ID
    const trip = await TripModel.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Check if the user is the trip leader
    if (trip.tripLeader.toString() === userId) {
      return res.status(400).json({ error: 'Trip leader cannot leave the trip' });
    }

    // Check if the user is a participant
    const participantIndex = trip.participants.indexOf(userId);
    if (participantIndex === -1) {
      return res.status(400).json({ error: 'You are not a participant in this trip' });
    }

    // Remove the user from the participants array
    trip.participants.splice(participantIndex, 1);

    // Decrement the currentParticipants count
    trip.groupSize.currentParticipants -= 1;

    // Update the spots available
    trip.spotsAvailable = trip.groupSize.maxParticipants - trip.groupSize.currentParticipants;

    // Save the updated trip
    await trip.save();

    res.status(200).json({
      message: 'Successfully left the trip',
      trip: trip
    });
  } catch (error) {
    console.error('Error leaving trip:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const getTripParticipants = async (req, res) => {
  const tripId = req.params.id;

  try {
    // Find the trip by ID and populate the participants array with user details
    const trip = await TripModel.findById(tripId).populate('participants', 'username email');

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Return the participants
    res.status(200).json({ 
      participants: trip.participants 
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

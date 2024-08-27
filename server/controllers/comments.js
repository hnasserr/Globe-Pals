import { TripModel } from "../models/trip.js";


export const addTripComment = async (req, res) => {
  const tripId = req.params.id;
  const userId = req.user.id; 
  const { comment, rating } = req.body;

  try {
    // Find the trip by ID
    const trip = await TripModel.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Create a new comment object
    const newComment = {
      user: userId,
      comment: comment,
      rating: rating || null
    };

    // Add the comment to the trip's comments array
    trip.comments.push(newComment);

    // Save the updated trip document
    await trip.save();

    res.status(200).json({ 
      message: 'Comment added successfully', 
      trip: trip 
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const deleteTripComment = async (req, res) => {
    const tripId = req.params.id;
    const commentId = req.params.commentId;
    const userId = req.user.id;

    try {
        // Find the trip by ID
        const trip = await TripModel.findById(tripId);

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Find the comment within the trip's comments array
        const comment = trip.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the user is the author of the comment or the trip leader
        if (comment.user.toString() !== userId && trip.tripLeader.toString() !== userId) {
            return res.status(403).json({ error: 'You do not have permission to delete this comment' });
        }

        // Remove the comment using pull
        trip.comments.pull(commentId);

        // Save the updated trip document
        await trip.save();

        res.status(200).json({
            message: 'Comment deleted successfully',
            trip: trip
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};
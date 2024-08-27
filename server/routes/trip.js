import express from "express";
import { authorize } from "../middleware/auth.js";
import { createTrip, deleteTrip, getAllTrips, getTripById, getTripParticipants, joinTrip, leaveTrip, searchTrips, updateTrip, updateTripStatus } from "../controllers/trip.js";
import { addTripComment, deleteTripComment } from "../controllers/comments.js";

const tripRouter = express.Router();

tripRouter.post('/create',authorize,  createTrip);
tripRouter.put('/update/:id', authorize, updateTrip);
tripRouter.delete('/delete/:id', authorize, deleteTrip);
tripRouter.get('/all', authorize, getAllTrips);
tripRouter.get('/get/:id', authorize, getTripById);
tripRouter.get('/search', searchTrips);
tripRouter.patch('/:id/status', authorize, updateTripStatus);
tripRouter.post('/:id/join', authorize, joinTrip);
tripRouter.patch('/:id/leave', authorize, leaveTrip);
tripRouter.get('/:id/participants', authorize, getTripParticipants);


tripRouter.post('/:id/comment', authorize, addTripComment);
tripRouter.delete('/:id/comment/:commentId', authorize, deleteTripComment); 

export default tripRouter;
import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import tripRouter from "./routes/trip.js";
import cloudinaryConfig from "./config/cluadinary.js";


const app = express();

const middlewares = (app) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors()); 
}

const establishedRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/trips', tripRouter);
  app.use('*', (req, res) => res.status(404).json({ error: "Endpoint not found." }));   
}


const connectAndStart = (app) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connection to database established")
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`http://localhost:  ${port}`)
      });
    })
    .catch((err) => console.log(err));
}

(function () {
  const app = express();
  middlewares(app);
  establishedRoutes(app);
  connectAndStart(app);
  cloudinaryConfig();
})();








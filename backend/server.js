import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adoptablePetRoutes from './routes/adoptablePetRoutes.js';
import adoptionFormRoutes from './routes/adoptionFormRoutes.js';
import forAdoptionRoutes from './routes/forAdoptionRoutes.js';
import passDataAdoptablePetTable from './routes/passDataAdoptablePetTable.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Routes
app.use('/api/adoptablepets', adoptablePetRoutes);
app.use('/api/adoptionform', adoptionFormRoutes);
app.use('/api/foradoption', forAdoptionRoutes);
app.use('/api', passDataAdoptablePetTable);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

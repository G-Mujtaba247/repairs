import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  estimatedDuration: { type: String }
}, { _id: false });

const availabilitySlotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true }
}, { _id: false });

const technicianProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: { type: String },
  deviceCategories: { type: [String], default: [] },
  servicesOffered: { type: [serviceSchema], default: [] },
  yearsExperience: { type: Number, default: 0 },
  availability: { type: [availabilitySlotSchema], default: [] },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'suspended'], default: 'pending' },
  profileImage: { type: String }
}, { timestamps: true });

const TechnicianProfile = mongoose.model('TechnicianProfile', technicianProfileSchema);
export default TechnicianProfile;

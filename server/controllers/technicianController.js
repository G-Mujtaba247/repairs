import TechnicianProfile from '../models/technicianProfileModel.js';
import User from '../models/userModel.js';

export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = req.body;
    let profile = await TechnicianProfile.findOne({ userId });
    if (profile) {
      profile = await TechnicianProfile.findOneAndUpdate({ userId }, data, { new: true });
    } else {
      data.userId = userId;
      profile = await TechnicianProfile.create(data);
    }
    return res.json({ status: true, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const getTechnician = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await TechnicianProfile.findById(id).populate('userId', 'name email phone');
    if (!profile) return res.status(404).json({ status: false, message: 'Technician not found' });
    return res.json({ status: true, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const listTechnicians = async (req, res) => {
  try {
    const { category, rating } = req.query;
    const filter = {};
    if (category) filter.deviceCategories = category;
    if (rating) filter.rating = { $gte: Number(rating) };
    const list = await TechnicianProfile.find(filter).populate('userId', 'name email phone');
    return res.json({ status: true, technicians: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const verifyTechnician = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await TechnicianProfile.findByIdAndUpdate(id, { verificationStatus: 'verified' }, { new: true });
    if (!profile) return res.status(404).json({ status: false, message: 'Technician not found' });
    return res.json({ status: true, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

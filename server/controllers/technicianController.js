import TechnicianProfile from '../models/technicianProfileModel.js';
import User from '../models/userModel.js';

export const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio, yearsExperience, deviceCategories, servicesOffered, availability, profileImage } = req.body;

    if (!bio || !deviceCategories || deviceCategories.length === 0) {
      return res.status(400).json({ status: false, message: 'Missing required fields' });
    }

    // Check if profile already exists
    let profile = await TechnicianProfile.findOne({ userId });
    if (profile) {
      return res.status(400).json({ status: false, message: 'Profile already exists' });
    }

    profile = await TechnicianProfile.create({
      userId,
      bio,
      yearsExperience,
      deviceCategories,
      servicesOffered,
      availability,
      profileImage,
      verificationStatus: 'pending'
    });

    await profile.populate('userId', 'name email phone');
    return res.json({ status: true, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const allowedFields = ['bio', 'yearsExperience', 'deviceCategories', 'servicesOffered', 'availability', 'profileImage'];
    const data = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
    if (!Array.isArray(data.deviceCategories) || !data.deviceCategories.length || !Array.isArray(data.servicesOffered) || !data.servicesOffered.length || !Array.isArray(data.availability) || !data.availability.length) {
      return res.status(400).json({ status: false, message: 'Categories, services, and availability are required' });
    }
    let profile = await TechnicianProfile.findOne({ userId });
    
    if (profile) {
      // Update existing profile
      profile = await TechnicianProfile.findOneAndUpdate({ userId }, data, { new: true }).populate('userId', 'name email phone');
    } else {
      // Create new profile
      data.userId = userId;
      profile = await TechnicianProfile.create(data);
      await profile.populate('userId', 'name email phone');
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
    const { category, rating, verified = 'true', query, availability } = req.query;
    const filter = { verificationStatus: verified === 'pending' ? 'pending' : verified === 'false' ? { $ne: 'verified' } : 'verified' };
    
    if (category) {
      filter.deviceCategories = category;
    }
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }
    if (query?.trim()) {
      filter.$or = [
        { bio: { $regex: query.trim(), $options: 'i' } },
        { deviceCategories: { $regex: query.trim(), $options: 'i' } },
        { 'servicesOffered.name': { $regex: query.trim(), $options: 'i' } }
      ];
    }
    if (availability) {
      filter['availability.day'] = { $regex: availability, $options: 'i' };
    }

    const list = await TechnicianProfile.find(filter)
      .populate('userId', 'name email phone')
      .sort({ rating: -1 });
    
    return res.json({ status: true, technicians: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const searchTechnicians = async (req, res) => {
  try {
    const { query, category, maxPrice } = req.query;
    const filter = { verificationStatus: 'verified' };
    
    if (query) {
      filter.$or = [
        { bio: { $regex: query, $options: 'i' } },
        { deviceCategories: { $regex: query, $options: 'i' } },
        { 'servicesOffered.name': { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.deviceCategories = category;
    }

    let list = await TechnicianProfile.find(filter)
      .populate('userId', 'name email phone')
      .sort({ rating: -1 });

    if (maxPrice) {
      const maxPriceNum = Number(maxPrice);
      list = list.filter(t => 
        t.servicesOffered.some(s => s.price <= maxPriceNum)
      );
    }

    return res.json({ status: true, technicians: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const verifyTechnician = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await TechnicianProfile.findByIdAndUpdate(
      id,
      { verificationStatus: 'verified' },
      { new: true }
    ).populate('userId', 'name email phone');
    
    if (!profile) return res.status(404).json({ status: false, message: 'Technician not found' });
    return res.json({ status: true, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const technicianStats = async (req, res) => {
  const [technicians, pendingVerifications, bookings] = await Promise.all([
    User.countDocuments({ role: 'technician' }),
    TechnicianProfile.countDocuments({ verificationStatus: 'pending' }),
    (await import('../models/bookingsModel.js')).default.countDocuments({})
  ]);
  return res.json({ status: true, stats: { technicians, pendingVerifications, marketplaceBookings: bookings } });
}

export const suspendTechnician = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await TechnicianProfile.findByIdAndUpdate(
      id,
      { verificationStatus: 'suspended' },
      { new: true }
    ).populate('userId', 'name email phone');
    
    if (!profile) return res.status(404).json({ status: false, message: 'Technician not found' });
    return res.json({ status: true, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

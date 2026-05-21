import Repairer from "../models/repairerModel.js";

// Haversine formula to calculate distance between two coordinates in km
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

// Seed sample repairers
export const seedRepairers = async (req, res) => {
    try {
        // Clear existing repairers
        await Repairer.deleteMany({});

        const sampleRepairers = [
            {
                name: "Asif Electronics & AC Repair",
                category: "electronics",
                specialties: ["AC", "Refrigerator", "Washing Machine"],
                locationName: "Gulberg, Lahore",
                latitude: 31.5115,
                longitude: 74.3436,
                rating: 4.8,
                phone: "+92 300 1234567",
                email: "asif.repair@gmail.com",
                status: "available",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200",
                pricing: 800,
                experience: 8
            },
            {
                name: "Bilal Auto Works & Car Tuning",
                category: "vehicles",
                specialties: ["Car", "Bike"],
                locationName: "Johar Town, Lahore",
                latitude: 31.4697,
                longitude: 74.2728,
                rating: 4.7,
                phone: "+92 312 9876543",
                email: "bilal.autos@gmail.com",
                status: "available",
                image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=200",
                pricing: 1200,
                experience: 6
            },
            {
                name: "Kamran Microwave & Oven Expert",
                category: "electronics",
                specialties: ["Microwave", "Oven", "Washing Machine"],
                locationName: "Dharampura, Lahore",
                latitude: 31.5540,
                longitude: 74.3730,
                rating: 4.5,
                phone: "+92 321 4567890",
                email: "kamran.repair@gmail.com",
                status: "available",
                image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=200",
                pricing: 600,
                experience: 4
            },
            {
                name: "Zain Laptop & Phone Techs",
                category: "electronics",
                specialties: ["Laptop", "Phone"],
                locationName: "DHA Phase 5, Lahore",
                latitude: 31.4682,
                longitude: 74.4283,
                rating: 4.9,
                phone: "+92 333 5556677",
                email: "zain.techs@gmail.com",
                status: "available",
                image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=200",
                pricing: 1000,
                experience: 5
            },
            {
                name: "Model Town Motor & Scooter Services",
                category: "vehicles",
                specialties: ["Bike", "Scooter"],
                locationName: "Model Town, Lahore",
                latitude: 31.4805,
                longitude: 74.3218,
                rating: 4.6,
                phone: "+92 345 1112233",
                email: "modeltown.motors@gmail.com",
                status: "available",
                image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=200",
                pricing: 500,
                experience: 3
            },
            {
                name: "Sajid Multi-Repairs (Vehicles & AC)",
                category: "both",
                specialties: ["Car", "Bike", "AC", "Refrigerator"],
                locationName: "Samnabad, Lahore",
                latitude: 31.5358,
                longitude: 74.3033,
                rating: 4.4,
                phone: "+92 301 4445556",
                email: "sajid.multirepair@gmail.com",
                status: "busy",
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200",
                pricing: 1500,
                experience: 10
            }
        ];

        const inserted = await Repairer.insertMany(sampleRepairers);
        return res.send({ status: true, message: "Repairers database seeded successfully!", count: inserted.length });
    } catch (error) {
        console.error("Error seeding repairers: ", error);
        return res.send({ status: false, message: "Failed to seed repairers." });
    }
};

// Create Repairer
export const createRepairer = async (req, res) => {
    try {
        const repairerData = req.body;
        const response = await Repairer.create(repairerData);
        if (response) {
            return res.send({ status: true, message: "Repairer profile created successfully!", repairer: response });
        } else {
            return res.send({ status: false, message: "Failed to create repairer profile." });
        }
    } catch (error) {
        console.error("Error creating repairer: ", error);
        return res.send({ status: false, message: "Network error!" });
    }
};

// Get All Repairers (with proximity sorting if lat/lng provided)
export const allRepairers = async (req, res) => {
    try {
        const { category, item, lat, lng } = req.query;
        let query = {};

        if (category && category !== "all") {
            // Can be "electronics" or "vehicles"
            // If repairer does "both", they fit in either
            query.$or = [{ category: category }, { category: "both" }];
        }

        if (item) {
            // Find repairer that has this specific item in their specialties array
            query.specialties = { $in: [item] };
        }

        let repairers = await Repairer.find(query);

        if (lat && lng) {
            const customerLat = parseFloat(lat);
            const customerLng = parseFloat(lng);

            // Map distances and sort
            const repairersWithDistance = repairers.map((repairer) => {
                const distance = getDistance(
                    customerLat,
                    customerLng,
                    repairer.latitude,
                    repairer.longitude
                );
                return {
                    ...repairer.toObject(),
                    distance: distance // in km
                };
            });

            // Sort nearest first
            repairersWithDistance.sort((a, b) => a.distance - b.distance);
            return res.send({ status: true, repairers: repairersWithDistance });
        }

        return res.send({ status: true, repairers });
    } catch (error) {
        console.error("Error fetching repairers: ", error);
        return res.send({ status: false, message: "Network error!" });
    }
};

// Update Repairer
export const updateRepairer = async (req, res) => {
    try {
        const { repairerId, ...updateData } = req.body;
        if (!repairerId) return res.send({ status: false, message: "Repairer ID is required." });

        const updated = await Repairer.findByIdAndUpdate(repairerId, updateData, { new: true });
        if (updated) {
            return res.send({ status: true, message: "Repairer profile updated successfully!", repairer: updated });
        } else {
            return res.send({ status: false, message: "Repairer not found." });
        }
    } catch (error) {
        console.error("Error updating repairer: ", error);
        return res.send({ status: false, message: "Network error!" });
    }
};

// Delete Repairer
export const deleteRepairer = async (req, res) => {
    try {
        const { repairerId } = req.params;
        if (!repairerId) return res.send({ status: false, message: "Repairer ID is required." });

        const deleted = await Repairer.findByIdAndDelete(repairerId);
        if (deleted) {
            return res.send({ status: true, message: "Repairer profile deleted successfully!" });
        } else {
            return res.send({ status: false, message: "Repairer not found." });
        }
    } catch (error) {
        console.error("Error deleting repairer: ", error);
        return res.send({ status: false, message: "Network error!" });
    }
};

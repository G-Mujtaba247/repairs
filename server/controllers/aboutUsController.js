import AboutUs from "../models/aboutUsModel.js";
import { uploadFile } from "../utils/cloudinary.js";


export const aboutUsDetail = async (req, res) => { // show contact us form details
    try {
        const aboutUs = await AboutUs.find({}).sort({createdAt: -1});
        console.log(aboutUs)
        return res.send({status: true, message: "About Us fetched", aboutUs})
    } catch (error) {
        console.log("Error: ", error);
    }
}
export const aboutUs = async (req, res) => { // add || update
    const { id } = req.params;
    const about = req.body;
    if (!about.file) return res.send({status: false, message: "Please select file"})
    
    const imgUrl = uploadFile(about.file, "aboutImages")
    try {
        const aboutData = { 
            mission: about.mission, 
            vision: about.vision, 
            file: imgUrl.secure_url, 
            features: about.features
        }
        if (id) {
            const existingAboutUs = await AboutUs.findById({ _id: id});
            if (existingAboutUs) {
                console.log(existingAboutUs);
                const updatedAboutUs = await AboutUs.findByIdAndUpdate( { _id: id }, aboutData, { new: true } );
                if (updatedAboutUs) {
                    return res.send({status: true, message: "About Us updated successfully", updatedAboutUs});
                } else {
                    return res.send({status: false, message: "About Us not found"});
                }
            }
        }

        
        // new entery
        if (!about.mission || !about.vision || !about.file || !about.features) {
            return res.send({status: false, message: "All fields are required"});
        }

        const newAboutUs = await AboutUs.create(aboutData);

        if (newAboutUs) {
            return res.send({status: true, message: "About Us created successfully", newAboutUs});
        } else {
            return res.send({status: false, message: "Failed to save About Us"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

// website related controllers fn()
export const aboutUsPage = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find({}).sort({createdAt: -1});
        return res.send({status: true, message: "About Us page fetched", aboutUs})
    } catch (error) {
        console.log("Error: ", error);
    }
}
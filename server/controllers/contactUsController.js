import ContactUs from "../models/contactUsModel.js";


export const contactUsDetail = async (req, res) => { // show contact us form details
    try {
        const contactUs = await ContactUs.find({}).sort({createdAt: -1});
        console.log("contactUs:", contactUs);
        return res.send({status: true, message: "Contact Us fetched", contactUs})
    } catch (error) {
        console.log("Error: ", error);
    }
}
export const contactUs = async (req, res) => { // add || update
    const { id } = req.params;
    const { phone, email, address, map } = req.body;

    try {
        if (id) {
            const existingContactUs = await ContactUs.findById({ _id: id});
            if (existingContactUs) {
                const updatedContactUs = await ContactUs.findByIdAndUpdate( { _id: id }, { phone, email, address, map }, { new: true } );
                if (updatedContactUs) {
                    return res.send({status: true, message: "Contact Us updated successfully", updatedContactUs});
                } else {
                    return res.send({status: false, message: "Contact Us not found"});
                }
            }
        }

        
        // new entery
        if (!phone || !email || !address || !map) {
            return res.send({status: false, message: "All fields are required"});
        }

        const newContactUs = await ContactUs.create({
            phone,
            email,
            address,
            map
        });

        if (newContactUs) {
            return res.send({status: true, message: "Contact Us created successfully", newContactUs});
        } else {
            return res.send({status: false, message: "Failed to create webpage"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

// website related controllers fn()
export const contactUsPages = async (req, res) => {
    try {
        const contactUs = await ContactUs.find({}).sort({createdAt: -1});
        return res.send({status: true, message: "Contact Us page fetched", contactUs})
    } catch (error) {
        console.log("Error: ", error);
    }
}
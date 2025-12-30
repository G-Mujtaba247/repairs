import Settings from "../models/settingsModel.js";


export const settingsDetail = async (req, res) => { // show contact us form details
    try {
        const settings = await Settings.find({}).sort({createdAt: -1});
        console.log("settings:", settings);
        return res.send({status: true, message: "Settings fetched", settings})
    } catch (error) {
        console.log("Error: ", error);
    }
}
export const settings = async (req, res) => { // add || update
    const { id } = req.params;
    const { appname, applogo, copyrighttext, sociallinks } = req.body;

    try {
        if (id) {
            const existingSettings = await Settings.findById({ _id: id});
            if (existingSettings) {
                const updatedSettings = await Settings.findByIdAndUpdate( { _id: id }, { appname, applogo, copyrighttext, sociallinks }, { new: true } );
                if (updatedSettings) {
                    return res.send({status: true, message: "Settings updated successfully", updatedSettings});
                } else {
                    return res.send({status: false, message: "Settings not found"});
                }
            }
        }

        
        // new entery
        if (!appname || !copyrighttext) {
            return res.send({status: false, message: "All fields are required"});
        }

        const newSettings = await Settings.create({ appname, applogo, copyrighttext, sociallinks });

        if (newSettings) {
            return res.send({status: true, message: "Settings created successfully", newSettings});
        } else {
            return res.send({status: false, message: "Failed to create webpage"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

// website related controllers fn()
export const settingsPages = async (req, res) => {
    try {
        const settings = await Settings.find({}).sort({createdAt: -1});
        return res.send({status: true, message: "Settings page fetched", settings})
    } catch (error) {
        console.log("Error: ", error);
    }
}
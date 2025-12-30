import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    appname: {
        type: String,
        required: true,
    },
    applogo: {
        type: String,
        required: false,
    },
    copyrighttext: {
        type: String,
        required: true,
    },
    sociallinks: {
        type: Array,
        required: false,
    }
}, { timestamps: true });

const Settings = mongoose.model("Setting", settingsSchema);
export default Settings;
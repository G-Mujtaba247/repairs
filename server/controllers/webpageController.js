import Webpage from "../models/webpageModel.js";

export const listWebpages = async (req, res) => {
    try {
        const webpages = await Webpage.find({}).sort({createdAt: -1});
        return res.send({status: true, message: "Webpages fetched", webpages})
    } catch (error) {
        console.log("Error: ", error);
    }
}
export const createWebpages = async (req, res) => {
    const { title, content, slug, status } = req.body;
    if (!title || !content || !slug ) {
        return res.send({status: false, message: "All fields are required"});
    }
    try {
        const existingWebpage = await Webpage.findOne({ slug: slug });
        if (existingWebpage) {
            return res.send({status: false, message: "Webpage with this slug already exists"});
        }
        const newWebpage = await Webpage.create({
            title,
            content,
            slug,
            status: status ? true : false,
        });
        
        if (newWebpage) {
            return res.send({status: true, message: "Webpage created successfully", newWebpage});
        } else {
            return res.send({status: false, message: "Failed to create webpage"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const detailWebpage = async (req, res) => {}
export const deleteWebpage = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    try {
        const deletedWebpage = await Webpage.findByIdAndDelete({ _id: id });
        if (deletedWebpage) {
            return res.send({status: true, message: "Webpage deleted successfully"});
        } else {
            return res.send({status: false, message: "Webpage not found"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}
export const updateWebpage = async (req, res) => {
    const { id } = req.params;
    const { title, content, slug, status } = req.body;
    console.log(id, req.body);
    if (!title || !content || !slug ) {
        return res.send({status: false, message: "All fields are required"});
    }
    try {
        const updatedWebpage = await Webpage.findByIdAndUpdate( { _id: id }, { title, content, slug, status}, { new: true } );
        if (updatedWebpage) {
            return res.send({status: true, message: "Webpage updated successfully", updatedWebpage});
        } else {
            return res.send({status: false, message: "Webpage not found"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}


// website related controllers fn()
export const websitePages = async (req, res) => {
    try {
        const webpages = await Webpage.find({ status: true });
        return res.send({status: true, message: "Website webpages fetched", webpages})
    } catch (error) {
        console.log("Error: ", error);
    }
}
export const websitePageDetails = async (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    try {
        const webpage = await Webpage.findOne({ slug: slug, status: true });
        if (webpage) {
            return res.send({status: true, message: "Webpage details fetched", webpage});
        } else {
            return res.send({status: false, message: "Webpage not found"});
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}
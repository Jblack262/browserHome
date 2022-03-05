const Bookmark = require('../models/bookmark');

const getAllObjects = async (req, res, x) => {
    try {
        console.log('test')
        const bookmarks = await Bookmark.find({})
        res.status(201).json({bookmarks})
    } catch (error) {
        // console.log('connection failed')
        res.status(500).json({msg:error})
    }
}

const getObject = async (req, res) => {
    try {
        const {id} = req.params;
        const bookmark = await Bookmark.findById(id).exec();
        res.status(201).json({bookmark})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createObject =  async (req, res) => {
    try {
        const bookmark = await Bookmark.create(req.body)
        res.status(201).json({bookmark})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateObject = async (req, res) => {
    try {
        const {id} = req.params;
        const newBookmark = req.body;
        const bookmark = await Bookmark.findOneAndUpdate({ _id: id }, newResource)
        res.status(201).json({newBookmark})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAll = async (req, res) => {
    try {
        await Bookmark.deleteMany({})
        res.status(201).json({success: true})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteObject = async (req, res) => {
    try {
        const {id} = req.params;
        const bookmark = await Bookmark.findOneAndDelete({ _id: id });
        res.status(201).json({bookmark})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllObjects,
    getObject,
    createObject,
    updateObject,
    deleteAll,
    deleteObject
}
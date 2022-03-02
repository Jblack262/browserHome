const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    icon: {
        type: String,
        default: "grade",
        required: [true, "Must Provide An Icon."]
    },
    link: {
        type: String,
        required: [true, "Must Provide Link."]
    },
    name: {
        type: String,
        required: [true, "Must Provide A Name."]
    }
})
//This is basic validation not advanced
module.exports = mongoose.model('Bookmark', productSchema)
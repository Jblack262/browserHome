const connectDB = require('./db/connect');
const Bookmark = require('./models/bookmark');

const bookmarks = require('./bookmarks.json');

//adds everything from products.json to the db
const populateProducts = async () => {
    console.log('populate')
    try {
        await connectDB(process.env.MONGO_URI);
        await Bookmark.deleteMany()
        // console.log(resources)
        await Bookmark.create(bookmarks)
        console.log('Success!!!!')
    } catch (error) {
        console.error(error)
    }
}

module.exports = populateProducts
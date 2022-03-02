const express = require('express');
const app = express();

const bookmarks = require('./routes/bookmarkRoutes');
const connectDB = require('./db/connect');
// const populateProducts = require('./populate');
require('dotenv').config();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use("/styles",express.static(__dirname + "/views/styles"));
app.use("/scripts",express.static(__dirname + "/views/scripts"));

app.use(express.json());
app.use('/api/v1/bookmarks', bookmarks);

const port = 80;

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});
// edit page
app.get('/edit', function(req, res) {
    res.render('pages/edit');
});
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`)
// })

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await populateProducts()
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) { console.log(error) }
}
start();
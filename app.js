const express = require('express');
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
const app = express();

const bookmarks = require('./routes/bookmarkRoutes');
// const populateProducts = require('./populate');
require('dotenv').config();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use("/styles",express.static(__dirname + "/views/styles"));
app.use("/scripts",express.static(__dirname + "/views/scripts"));
app.use("/node_modules",express.static(__dirname + "/node_modules"));

app.use(express.json());
app.use('/api/v1/bookmarks', bookmarks);
app.use(cookieParser());

const port = process.env.PORT || 5000;

// index page
app.get('/', function(req, res) {
    res.cookie("Set-Cookie", "HttpOnly;Secure;SameSite=None");
    res.render('pages/index');
});
// edit page
app.get('/edit', function(req, res) {
    res.render('pages/edit');
});
// login page
app.get('/login', function(req, res) {
    res.render('pages/login');
});
// sign up page
app.get('/sign-up', function(req, res) {
    res.render('pages/signUp');
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
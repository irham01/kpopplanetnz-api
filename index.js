const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const eventsRouter = require('./routers/eventsRouter.js');

const app = express();

const PORT = process.env.PORT || 3001;
//Initiate Mongoose, handle error and print if success
var db;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/kpopplanetnz", { useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
        db = mongoose.connection;
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

app.use(express.static('public'));
app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/events', eventsRouter);

// Generic error handler used by all endpoints.
app.use((err, req, res) => {
    console.log("ERROR: " + err.message);
    res.status(err.status || 500).json({
        "error": {
            "message": err.message,
            "response": err.response
        }
    });
});

app.get('/api/about', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});

app.get('/api/sponsor', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});

// app.put('/sponsor/:id', (req, res, next) => {
    
// }); 

// app.delete('/sponsor/:id', (req, res, next) => {
    // //SQL Delete
    // res.send(req.param.id);
// });

app.get('/api/contactrequest', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});
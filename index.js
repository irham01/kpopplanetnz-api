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
app.use('/events', eventsRouter);

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.use((req, res, next) => {
	console.log(`${req.method} Request Received`);
    next();
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

/*  "/api/events"
 *    GET: finds all events
 *    POST: creates a new event
 */
app.get('/api/events', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    db.collection(EVENTS_COLLECTION).find({}).toArray(function(err, events) {
        if (err) {
          handleError(res, err.message, "Failed to get events.");
        } else {
          res.status(200).json(events);
        }
    });
    //res.send(dummyEvents);
});

app.post('/api/event', (req, res, next) => {
    var newEvent = req.body;
    
    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(EVENTS_COLLECTION).insertOne(newEvent, function(err, event) {
          if (err) {
            handleError(res, err.message, "Failed to create new event.");
          } else {
            res.status(201).json(event.ops[0]);
          }
        });
    }
});

app.put('/api/event', (req, res, next) => {
    var newEvent = req.body;
    
    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(EVENTS_COLLECTION).insertOne(newEvent, function(err, event) {
          if (err) {
            handleError(res, err.message, "Failed to create new event.");
          } else {
            res.status(201).json(event.ops[0]);
          }
        });
    }
});

app.get('/api/contactrequest', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});
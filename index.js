const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const EVENTS_COLLECTION = "events";


const app = express();

app.use(express.static('public'));
app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

const dummyEvents = [
    {
        eventID: 1,
        name: 'O-week',
        overview: 'Orientation week! Meet the team, make some friends. Have fun',
        description: 'Orientation Week is a week full of fun and games. During this week we also have clubs expo where you can find out more about our club, Meet our staff members, Talk about KPOP and many more.',
        startDateTime: '2018-12-25 18:51:58',
        endDateTime: '2018-12-25 18:51:58',
        location: 'TBC',
        isActive: 1
    },
    {
        eventID: 2,
        name: 'New Members Night',
        overview: 'Orientation week! First event for new Members',
        description: 'Orientation Week is a week full of fun and games. During this week we also have clubs expo where you can find out more about our club, Meet our staff members, Talk about KPOP and many more.',
        startDateTime: '2018-12-26 18:51:58',
        endDateTime: '2018-12-26 18:51:58',
        location: 'TBC',
        isActive: 1
    }
];

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
});


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

app.get('/api/contactrequest', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});
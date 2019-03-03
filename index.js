const express = require('express');
// Middleware
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const compression = require("compression"); 
const helmet = require('helmet'); 

// Routes
const eventsRouter = require('./routers/eventsRouter.js');
const profilesRouter = require('./routers/profilesRouter.js');
const sponsorsRouter = require('./routers/sponsorsRouter.js');

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

// Set frontend and middlewares
app.use(express.static('public'));
app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/sponsors', sponsorsRouter);

// Generic error handler used by all endpoints.
app.use((err, req, res, next) => {
    console.log((err.name || "ERROR") + err.message);
    const json = 
    {
        error: {
            message: err.message,
            response: err.response
        }
    };
    if (process.env.ENV === 'dev') {
        json.error.stack = err.stack;
    }
    res.status(err.status || 500).json(json);
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
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(morgan('short'));
app.use(cors());

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

app.use((req, res, next) => {
	console.log(`${req.method} Request Received`);
    next();
});

app.get('/about', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});

app.get('/sponsor', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});

// app.put('/sponsor/:id', (req, res, next) => {
    
// }); 

// app.delete('/sponsor/:id', (req, res, next) => {
    // //SQL Delete
    // res.send(req.param.id);
// });

app.get('/event', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send(dummyEvents);
});

app.get('/contactrequest', (req, res, next) => {
    console.log(`-- ${req.path} --`);
    res.send('Success');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
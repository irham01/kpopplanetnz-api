const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

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

/*  "/events"
 *    GET: finds all events
 *    POST: creates a new event
 */
router.get('/', eventsController.events_list);
router.get('/:id', eventsController.event_detail);
router.post('/', eventsController.event_create);
router.put('/:id', eventsController.event_update);
router.delete('/:id', eventsController.event_delete)

module.exports = router;
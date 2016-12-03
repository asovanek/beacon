import EventCollection from "./events";

/**
 * Generates an EventCollection out of the availability endpoint
 */
export default EventCollection.extend({
    url: '/api/availability',

    initialize: function() {
        this.keys = {};
    },

    parse: function(response) {
        var events = [];
        _.each(response, function(dates, experienceId) {
            _.each(dates, function(times, date) {
                _.each(times, function(open, time) {
                    var event = new Event({
                        open: open,
                        max: open,
                        start: moment(date + ('0000' + time).slice(-4), 'YYYY-MM-DDHHmm').toDate(),
                        experience: {id: experienceId},
                        title: 'Nema', //app.findModel(experienceId, 'experiences', {}, false, false).get('name'),
                        quantity: {
                            reserved: 0
                        }
                    });
                    events.push(event);
                });
            });
        });

        return events;
    }
});

import Event from "../model/event"
import EventCollection from "./events";
import moment from "moment";
import CollectionPool from "../collection_pool";
import $ from "jquery";

/**
 * Generates an EventCollection out of the availability endpoint
 */
export default EventCollection.extend({
    url: '/api/availability',

    initialize: function () {
        this.keys = {};
    },

    parse: function (response) {
        var events = [];
        $.each(response, function (experienceId, dates) {
            $.each(dates, function (date, times) {
                $.each(times, function (time, open) {
                    var event = new Event({
                        open: open,
                        max: open,
                        start: moment(date + ('0000' + time).slice(-4), 'YYYY-MM-DDHHmm'),
                        experience: CollectionPool.getCollection('experiences').getModel(experienceId),
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

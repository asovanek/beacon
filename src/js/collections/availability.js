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
        var now = moment();
        $.each(response, function (experienceId, dates) {
            $.each(dates, function (date, times) {
                $.each(times, function (time, open) {
                    var experience = CollectionPool.getCollection('experiences').getModel(experienceId);
                    var cutoff = experience.get('cutoff');
                    var start = moment(date + ('0000' + time).slice(-4), 'YYYY-MM-DDHHmm');
                    var bookingDeadline = start.clone();
                    if (cutoff) {
                        bookingDeadline.subtract(cutoff, 'm');
                    }

                    var event = new Event({
                        id: date + ':' + time + '-' + experienceId,
                        open: open,
                        max: open,
                        start: start,
                        bookingDeadline: bookingDeadline,
                        experience: experience,
                        quantity: {
                            reserved: 0
                        }
                    });

                    if (!event.isAllDay() && event.get('bookingDeadline').isAfter(now)) {
                        events.push(event);
                    }
                });
            });
        });

        return events;
    },

    /**
     * Sort events based on ascending order of their start time. Earlier events go at the top, with all-day events
     * being pushed to the bottom
     *
     * @returns {number}
     */
    comparator: function(model1, model2) {
        if (!model1.get('start') || !model2.get('start')) {
            return 1;
        }

        if (model1.get('start').isSame(model2.get('start'))) {
            // If both events are on the same day, then all day events are always last

            if (model1.isAllDay()) {
                return 1;
            }

            if (model2.isAllDay()) {
                return -1;
            }
        }

        return model1.get('start').isAfter(model2.get('start')) ? 1 : -1;
    },
});

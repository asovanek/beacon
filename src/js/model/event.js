import Backbone from "backbone";
import CollectionPool from "../collection_pool";
import moment from "moment";

export default Backbone.Model.extend({
    urlRoot: '/api/events',

    url: function() {
        return this.urlRoot + '/' + this.id;
    },

    initialize: function () {
        this.listenTo(this.get('experience'), 'change:cutoff', this.updateBookingDeadline);
        this.listenTo(this, 'change:start', this.updateBookingDeadline);
    },

    updateBookingDeadline: function (experience) {
        var startTime = this.get('start');
        var cutoff = experience.get('cutoff');

        var bookingDeadline = startTime.clone();

        if (cutoff) {
            bookingDeadline.subtract(cutoff, 'm');
        }

        this.set('bookingDeadline', bookingDeadline);
    },

    /**
     * Return's true if the event is an all-day event
     *
     * @returns {boolean}
     */
    isAllDay: function() {
        var time = this.get('start').format('HHmm');
        return (time === '0000');
    },

    parse: function (response, options) {
        if (!response) {
            return response;
        }

        options = options || {};
        if (!options.hasOwnProperty('timezoneOffset')) {
            options.timezoneOffset = true;
        }

        if (response.hasOwnProperty('start')) {
            response.start = moment(response.start);
        }

        if (response.hasOwnProperty('end')) {
            response.end = moment(response.end);
        }

        if (response.hasOwnProperty('experience')) {
            var experiences = CollectionPool.getCollection('experiences');
            response.experience = experiences.getModel(response.experience.id);
        }

        return response;
    }
});
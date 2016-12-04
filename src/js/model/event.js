import Backbone from "backbone";
import CollectionPool from "../collection_pool";
import moment from "moment";

export default Backbone.Model.extend({
    urlRoot: '/api/events',

    url: function() {
        return this.urlRoot + '/' + this.id;
    },

    initialize: function () {
        if (this.get("start")) {
            var date = this.get("start").toDate();
            // console.log(date);

            // var job = Scheduler.scheduleJob(date, function(){
            //     console.log('The world is going to end today.');
            // });
        }
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

            // if (options.timezoneOffset) {
            //     // Offset the date by the current timezone since the date is in UTC
            //     response.start.setMinutes(response.start.getMinutes() + response.start.getTimezoneOffset());
            // }
            //
            // response.start = response.start.toLocaleTimeString();
        }

        if (response.hasOwnProperty('end')) {
            response.end = moment(response.end);

            // if (options.timezoneOffset) {
            //     // Offset the date by the current timezone since the date is in UTC
            //     response.end.setMinutes(response.end.getMinutes() + response.end.getTimezoneOffset());
            // }
        }

        if (response.hasOwnProperty('experience')) {
            var experiences = CollectionPool.getCollection('experiences');
            response.experience = experiences.getModel(response.experience.id);
        }

        return response;
    },

    // scheduleExpirationxpiration() {
    //     var date = this.get("start").toDate();
    //     console.log(date);
    //
    //     // var job = Scheduler.scheduleJob(date, function(){
    //     //     console.log('The world is going to end today.');
    //     // });
    // },
    //
    // cancelScheduledJob() {
    //
    // }
});
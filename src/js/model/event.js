import Backbone from "backbone";

export default Backbone.Model.extend({
    urlRoot: '/api/events',

    url: function() {
        return this.urlRoot + '/' + this.id;
    },

    parse: function (resp, options) {
        if (!resp) {
            return resp;
        }

        options = options || {};
        if (!options.hasOwnProperty('timezoneOffset')) {
            options.timezoneOffset = true;
        }

        if (resp.hasOwnProperty('start')) {
            resp.start = new Date(resp.start);

            console.log(resp.start.getTime());

            if (options.timezoneOffset) {
                // Offset the date by the current timezone since the date is in UTC
                resp.start.setMinutes(resp.start.getMinutes() + resp.start.getTimezoneOffset());
            }

            resp.start = resp.start.toLocaleTimeString();
        }

        if (resp.hasOwnProperty('end')) {
            resp.end = new Date(resp.end);

            if (options.timezoneOffset) {
                // Offset the date by the current timezone since the date is in UTC
                resp.end.setMinutes(resp.end.getMinutes() + resp.end.getTimezoneOffset());
            }
        }

        return resp;
    }
});
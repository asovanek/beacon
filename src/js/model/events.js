import Backbone from "backbone";
import Event from "./event";

/**
 * @param {String} [start] start date
 * @param {String} [end]   end date
 */
export default Backbone.Collection.extend({
    model: Event,
    url: '/api/events',
});
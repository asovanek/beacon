import Backbone from "backbone";
import _ from "underscore";

export default Backbone.Model.extend({
    defaults() {
        return {
            time: this.getCurrentTime()
        }
    },

    initialize() {
        this.changeTime = _.bind(this.changeTime, this);
        setInterval(this.changeTime, 1000)
    },

    changeTime() {
        this.set('time', this.getCurrentTime());
    },

    getCurrentTime() {
        var now = new Date();
        return now.toLocaleTimeString();
    }
});
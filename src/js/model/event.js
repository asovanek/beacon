import Backbone from "backbone";

export default Backbone.Model.extend({
    urlRoot: '/api/events',
    url: function() {
        return this.urlRoot + '/' + this.id;
    }
});
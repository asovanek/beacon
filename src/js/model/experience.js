import Backbone from "backbone";

export default Backbone.Model.extend({
    urlRoot: '/api/experiences',

    url: function() {
        return this.urlRoot + '/' + this.id;
    }
});
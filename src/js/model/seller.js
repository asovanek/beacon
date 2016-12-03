import * as Backbone from "backbone";

export default Backbone.Model.extend({
    urlRoot: '/api/sellers',
    url: function() {
        return this.urlRoot + '/' + this.id;
    }
});
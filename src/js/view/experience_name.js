import Marionette from "backbone.marionette";

export default Marionette.View.extend({
    modelEvents: {
        "change": "render"
    }
});

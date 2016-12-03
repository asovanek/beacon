import Marionette from "backbone.marionette";

export default Marionette.View.extend({
    className: 'experience-name text-center',
    modelEvents: {
        "change": "render"
    }
});

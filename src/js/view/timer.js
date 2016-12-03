import Marionette from "backbone.marionette";

export default Marionette.View.extend({
    tagName: 'time',
    modelEvents: {
        'change:time': 'render'
    }
});

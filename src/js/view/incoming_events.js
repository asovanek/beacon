import Marionette from "backbone.marionette";
import EventSummaryView from "./event_summary";
import moment from "moment";

export default Marionette.CollectionView.extend({
    childView: EventSummaryView,

    initialize: function(options) {
        this.filters = options.filters;

        this.listenTo(this.collection, 'change', this.render);

        var now = moment("2016-12-30");
        
        this.collection.fetch({
            data: {
                seller: this.filters.seller.get("id"),
                start: now.unix(),
                end: now.clone().add('days', 1).unix(),
                offset: new Date(now).getTimezoneOffset() * 60
            }
        });
    }
});

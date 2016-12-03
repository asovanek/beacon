import Marionette from "backbone.marionette";
import EventSummaryView from "./event_summary";

export default Marionette.CollectionView.extend({
    childView: EventSummaryView,

    initialize: function(options) {
        this.filters = options.filters;

        this.listenTo(this.collection, 'change', this.render);

        this.collection.fetch({
            data: {
                seller: this.filters.seller.get("id")
            }
        });
    }
});

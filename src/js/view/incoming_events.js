import Marionette from "backbone.marionette";
import EventSummaryView from "./event_summary";
import moment from "moment";

const THIRTY_SECONDS = 5555;

export default Marionette.CollectionView.extend({
    childView: EventSummaryView,

    fetchData: function () {
        var now = moment("2016-12-30");

        this.collection.fetch({
            data: {
                seller: this.filters.seller.get("id"),
                start: now.unix(),
                end: now.clone().add('days', 1).unix(),
                offset: new Date(now).getTimezoneOffset() * 60
            }
        });
    },

    refresh: function() {
        var fetchData = this.fetchData.bind(this);
        setInterval(fetchData, THIRTY_SECONDS);
    },

    initialize: function(options) {
        this.filters = options.filters;

        this.listenTo(this.collection, 'change', this.render);

        this.fetchData();
        this.refresh();
    }
});

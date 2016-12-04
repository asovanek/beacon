import Marionette from "backbone.marionette";
import EventSummaryView from "./event_summary";
import moment from "moment";
import Scheduler from "node-schedule";

const REFRESH_INTERVAL = 30000;

export default Marionette.CollectionView.extend({
    tagName: 'table',
    childView: EventSummaryView,

    fetchData: function () {
        var now = moment();

        this.collection.fetch({
            data: {
                seller: this.filters.seller.get("id"),
                start: now.format('YYYY-MM-DD'),
                end: now.format('YYYY-MM-DD'),
                ignoreCutoff: true,
            }
        });
    },

    refresh: function() {
        var fetchData = this.fetchData.bind(this);
        setInterval(fetchData, REFRESH_INTERVAL);
    },

    initialize: function(options) {
        this.filters = options.filters;

        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'remove', this.onRemove);

        this.fetchData();
        this.refresh();
    },
    onAdd: function (event) {
        var date = event.get('start').toDate();
        var collection = this.collection;

        event.job = Scheduler.scheduleJob(date, function(){
            collection.remove(event);
        });
    },
    onRemove: function (event) {
        if (event.job) {
            event.job.cancel();
            event.job = null;
        }
    },
});

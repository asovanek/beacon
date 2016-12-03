import Backbone from "backbone";
import Marionette from "backbone.marionette";
import SellerSummaryView from "./seller_summary"
import IncomingEventsView from "./incoming_events"
import EventCollection from "../model/events"

/**
 * @param Seller model
 */
export default Marionette.View.extend({
    regions: {
        sellerSummary: ".seller-summary",
        incomingEvents: ".incoming-events"
    },

    onRender: function () {
        this.showChildView('sellerSummary', new SellerSummaryView({model: app.seller}));

        this.showChildView('incomingEvents', new IncomingEventsView({
            collection: new EventCollection(),
            filters: {seller: app.seller}
        }));
    }
});

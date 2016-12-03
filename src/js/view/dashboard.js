import Marionette from "backbone.marionette";
import SellerSummaryView from "./seller_summary"
import IncomingEventsView from "./incoming_events"
import CollectionPool from "../collection_pool";

/**
 * @param Seller model
 */
export default Marionette.View.extend({
    regions: {
        sellerSummary: {
            el: ".seller-summary",
            replaceElement: true
        },
        incomingEvents: {
            el: ".incoming-events",
            replaceElement: true
        }
    },

    onRender: function () {
        this.showChildView('sellerSummary', new SellerSummaryView({model: app.seller}));

        this.showChildView('incomingEvents', new IncomingEventsView({
            collection: CollectionPool.getCollection('availability'),
            filters: {seller: app.seller}
        }));
    }
});

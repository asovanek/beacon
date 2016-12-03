import Marionette from "backbone.marionette";
import ExperiencePriceView from "./experience_price";

export default Marionette.View.extend({
    regions: {
        price: ".price"
    },

    getAvailabilityClass: function () {
        const open = this.model.get("open");

        return open === 0 ? "full" : open <= 20 ? "almost-full" : "available"
    },

    templateContext() {

        return {
            "availability": this.getAvailabilityClass()
        }
    },

    onRender() {
        this.showChildView("price", new ExperiencePriceView({model: this.model.get('experience')}));
    }
});

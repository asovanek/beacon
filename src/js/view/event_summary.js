import Marionette from "backbone.marionette";
import ExperienceNameView from "./experience_name";
import ExperiencePriceView from "./experience_price";

export default Marionette.View.extend({
    regions: {
        experience: {
            el: ".experience",
            replaceElement: true
        },
        price: ".price"
    },

    getAvailabilityClass: function () {
        const open = this.model.get("open");
        if (open === 0) {
            return "full";
        }

        const experience = this.model.get('experience'),
            eventMax = this.model.get('max'),
            max = eventMax || experience.get('group').max;

        if (max) {
            let percentage = open / max * 100;
            return percentage <= 25 ? "almost-full" : "available"
        } else {
            return open <= 5 ? "almost-full" : "available"
        }
    },

    serializeData() {
        var data = this.model.toJSON();
        data.start = this.model.get("start").format("hh:mm A");
        return data;
    },

    templateContext() {
        return {
            "availability": this.getAvailabilityClass()
        }
    },

    onRender() {
        this.showChildView("experience", new ExperienceNameView({model: this.model.get('experience')}));
        this.showChildView("price", new ExperiencePriceView({model: this.model.get('experience')}));
    }
});

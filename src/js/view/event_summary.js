import Marionette from "backbone.marionette";
import ExperienceView from "./experience";
import ExperiencePriceView from "./experience_price";
// import Scheduler from "node-schedule";

export default Marionette.View.extend({
    tagName: 'tr',
    regions: {
        experience: ".experience",
        price: ".price"
    },

    getAvailabilityClass() {
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
        data.start = this.model.get("start").format("LT");
        return data;
    },

    templateContext() {
        return {
            "availability": this.getAvailabilityClass()
        }
    },

    onRender() {
        this.showChildView("experience", new ExperienceView({model: this.model.get('experience')}));
        this.showChildView("price", new ExperiencePriceView({model: this.model.get('experience')}));

        // var date = new Date();
        // date = new Date(date.getTime() + 10000);

        // var job = Scheduler.scheduleJob(date, function(){
        //     console.log('The world is going to end today.');
        // });
    }
});

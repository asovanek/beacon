import Marionette from "backbone.marionette";
import ExperienceView from "./experience";
import ExperiencePriceView from "./experience_price";
import ChannelEventHandler from "./../events/eventHandler";

export default Marionette.View.extend({
    tagName: 'tr',
    regions: {
        experience: ".experience",
        price: ".price"
    },

    modelEvents: {
        "change": "onModelChanged"
    },

    initialize: function() {
        this.setUpPusherChannel(self.pusher,'event');
        this.channelEventHandlers = new ChannelEventHandler({experienceSummary:this.model});
    },

    onModelChanged: function(){
        this.render();
    },

    setUpPusherChannel: function(pusher, event) {
        var channel = app.pusher.subscribe('private-586cd0c8a48cf275048b4568');
        var self = this;
        channel.bind(event, function(data){
            self.channelDataHandler(event, data);
        });
    },

    channelDataHandler: function(event, data){
        this.channelEventHandlers.eventHandler(event, data);
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
    }
});

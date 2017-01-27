import Marrionete from "backbone.marionette";
export default Marrionete.Object.extend({

    initialize: function(options) {

        this.model = options.experienceSummary;

    },

    eventHandler: function(event, data){

        switch(event){
            case 'event':
            this.experienceUpdate(data);
            break;
        }
    },

    experienceUpdate: function(orderData){

        if (orderData.open > 0) {
            this.model.set('open', orderData.open);
        }

    }
});
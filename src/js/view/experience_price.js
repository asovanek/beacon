import Marionette from "backbone.marionette";

export default Marionette.View.extend({
    modelEvents: {
        "change": "render"
    },

    templateContext: function () {
        var price = this.model.get('price'),
            currency = this.model.get('currency'),
            formattedPrice;

        if (price && currency) {
            formattedPrice = price.toLocaleString('en', {style: 'currency', currency: currency});
        }
        return {
            formattedPrice: formattedPrice
        }
    }
});

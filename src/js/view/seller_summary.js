import Marionette from "backbone.marionette";

/**
 * @param Seller model
 */
export default Marionette.View.extend({
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    serializeData: function () {
        var data = this.model.toJSON();

        if (this.model.get('picture')) {
            data.coverUrl = app.getAbsoluteUrl(this.model.get('picture').src);
        }

        if (this.model.get('logo')) {
            data.logoUrl = app.getAbsoluteUrl(this.model.get('logo').src);
        }

        return data;
    },

    onRender: function () {
        var view = this;
        setInterval(function(){
            view.updateTime.call(view)
        }, 500);
    },

    updateTime: function () {
        var now = new Date();
        this.$el.find(".time").html(now.toLocaleTimeString());
    }
});

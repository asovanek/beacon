import Marionette from "backbone.marionette";
import TimerView from './timer';
import Timer from '../model/timer'

/**
 * @param Seller model
 */
export default Marionette.View.extend({
    modelEvents: {
        'change': 'render'
    },

    regions: {
        time: '.time'
    },

    serializeData() {
        var data = this.model.toJSON();

        data.logoUrl = app.getAbsoluteUrl();

        return data;
    },

    onRender() {
        this.showChildView("time", new TimerView({model: new Timer()}));
    }
});

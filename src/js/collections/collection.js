import Backbone from "backbone";

export default Backbone.Collection.extend({
    getModel: function (id) {
        var model = this.get(id);
        if (!model) {
            model = new this.model({
                id: id
            });
            model.fetch();
            this.add(model);
        }
        return model;
    }
});

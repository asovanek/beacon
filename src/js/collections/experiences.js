import Collection from "./collection";
import Experience from "../model/experience";

export default Collection.extend({
    model: Experience,
    url: '/api/experiences',

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
